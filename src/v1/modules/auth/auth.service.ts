import { ms, TStringValue } from '@alexdevco/common'
import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { hash, verify } from 'argon2'
import { Request, Response } from 'express'

import { Role, User } from '../../../../prisma/generated/client'
import {
	EmployeeRepository,
	PasswordHistoryRepository,
	PositionRepository,
	SubsidiaryRepository,
	UserRepository
} from '../../../repositories'
import { IJwtPayload, ITokens } from '../../../shared/types'
import { omit } from '../../../shared/utils'

import {
	ChangePasswordRequest,
	LoginRequest,
	LoginResponse,
	RefreshResponse,
	RegisterRequest,
	RegisterResponse
} from './dto'

@Injectable()
export class AuthService {
	public REFRESH_TOKEN_NAME = 'refreshToken'
	private readonly ACCESS_TOKEN_EXPIRES: TStringValue
	private readonly REFRESH_TOKEN_EXPIRES: TStringValue

	private readonly _logger: Logger

	public constructor(
		private readonly userRepository: UserRepository,
		private readonly passwordHistoryRepository: PasswordHistoryRepository,
		private readonly employeeRepository: EmployeeRepository,
		private readonly positionRepository: PositionRepository,
		private readonly subsidiaryRepository: SubsidiaryRepository,
		private readonly jwt: JwtService,
		private readonly config: ConfigService
	) {
		this.REFRESH_TOKEN_EXPIRES = this.config.getOrThrow<TStringValue>(
			'JWT_REFRESH_EXPIRES_IN'
		)
		this.ACCESS_TOKEN_EXPIRES = this.config.getOrThrow<TStringValue>(
			'JWT_ACCESS_EXPIRES_IN'
		)

		this._logger = new Logger(AuthService.name)
	}

	/**
	 * Регистрация нового пользователя
	 *
	 * @param res - Объект HTTP-ответа (Response)
	 * @param data - Данные для входа в систему (см. {@link LoginRequest})
	 *
	 * @returns Данные пользователя и токен доступа (см. {@link LoginResponse})
	 */
	public async login(
		res: Response,
		data: LoginRequest
	): Promise<LoginResponse> {
		const { email, password } = data

		const user = await this.userRepository.findByEmail(email)
		if (!user)
			throw new NotFoundException(
				'Не верная электронная почта или пароль'
			)
		if (!user.employee) {
			this._logger.error(
				`У пользователя ${user.id} не найдена запись Employee`
			)
			throw new NotFoundException(
				'Не найдена запись сотрудника у пользователя'
			)
		}

		const isPasswordValid = await verify(user.passwordHash, password)
		if (!isPasswordValid)
			throw new NotFoundException(
				'Не верная электронная почта или пароль'
			)

		const { accessToken, refreshToken } = this.issueTokens(
			user.id,
			user.employee.username,
			user.employee.role
		)

		this.addRefreshTokenToResponse(res, refreshToken)

		return {
			accessToken,
			user: omit(user, [
				'passwordHash',
				'createdAt',
				'updatedAt',
				'lastLogin'
			])
		}
	}

	/**
	 * Регистрация нового пользователя
	 *
	 * @param res - Объект HTTP-ответа (Response)
	 * @param data - Данные для регистрации пользователя (см. {@link RegisterRequest})
	 *
	 * @returns Данные пользователя и токен доступа (см. {@link RegisterResponse})
	 */
	public async register(
		res: Response,
		data: RegisterRequest
	): Promise<RegisterResponse> {
		const { email, username, positionId, subsidiaryId } = data

		const isEmailExist = await this.userRepository.findByEmail(email)
		if (isEmailExist)
			throw new BadRequestException(
				`Пользователь с электронной почтой ${email} уже используется`
			)

		const isUsernameExist =
			await this.employeeRepository.findByUsername(username)
		if (isUsernameExist)
			throw new BadRequestException(
				`Сотрудник с именем пользователя ${username} уже существует`
			)

		const isSubsidiaryExist =
			await this.subsidiaryRepository.findById(subsidiaryId)
		if (!isSubsidiaryExist) throw new NotFoundException('Филиал не найден')

		const isPositionExist =
			await this.positionRepository.findById(positionId)
		if (!isPositionExist)
			throw new NotFoundException('Должность не найдена')

		const { password, firstName, lastName, middleName, role } = data

		let user: User | null

		try {
			user = await this.userRepository.create({
				email,
				passwordHash: await hash(password),
				lastLogin: new Date(Date.now()).toISOString()
			})

			if (user) {
				await this.employeeRepository.create({
					username,
					firstName,
					lastName,
					middleName,
					role,
					user: {
						connect: { id: user.id }
					},
					position: { connect: { id: positionId } },
					subsidiary: { connect: { id: subsidiaryId } }
				})

				await this.passwordHistoryRepository.create({
					email: user.email,
					password: user.passwordHash,
					user: {
						connect: {
							id: user.id
						}
					}
				})
			}
		} catch (e) {
			this._logger.error('Не удалось создать пользователя', data)
			throw new InternalServerErrorException(
				'Ошибка при создании записи о новом пользователе'
			)
		}

		if (!user) {
			this._logger.error('Не удалось создать пользователя', data)
			throw new InternalServerErrorException(
				'Ошибка при создании записи о новом пользователе'
			)
		}

		const { accessToken, refreshToken } = this.issueTokens(
			user.id,
			username,
			role
		)

		this.addRefreshTokenToResponse(res, refreshToken)

		return {
			success: true,
			accessToken,
			user: omit(user, [
				'passwordHash',
				'createdAt',
				'updatedAt',
				'lastLogin'
			])
		}
	}

	/**
	 * Выход из системы
	 *
	 * @param res - Объект HTTP-ответа ({@link Response})
	 *
	 * @returns Данные выполнения операции (boolean)
	 */
	public async logout(res: Response) {
		this.removeRefreshTokenFromResponse(res)
		return true
	}

	/**
	 * Обновление токенов доступа
	 *
	 * @param res - Объект HTTP-ответа (Response)
	 * @param req - Объект HTTP-запроса (Request)
	 *
	 * @returns Данные пользователя и токен доступа (см. {@link RefreshResponse})
	 */
	public async refresh(
		res: Response,
		req: Request
	): Promise<RefreshResponse> {
		const refreshTokenFromCookies = req.cookies[this.REFRESH_TOKEN_NAME]
		if (!refreshTokenFromCookies) {
			this.removeRefreshTokenFromResponse(res)
			throw new UnauthorizedException(
				'Ошибка обработки токена обновления'
			)
		}

		const { refreshToken, ...response } = await this.getNewTokens(
			refreshTokenFromCookies
		)

		this.addRefreshTokenToResponse(res, refreshToken)

		return {
			user: omit(response.user, [
				'passwordHash',
				'createdAt',
				'updatedAt',
				'lastLogin'
			]),
			accessToken: response.accessToken
		}
	}

	/**
	 * Обновление пароля пользователя
	 *
	 * @param userId - Уникальный идентификатор пользователя
	 * @param data - Данные, для обновления пароля (см. {@link ChangePasswordRequest})
	 *
	 * @returns Ответ, об успешности выполнения смены пароля пользователя (boolean)
	 */
	public async changePassword(userId: string, data: ChangePasswordRequest) {
		const user = await this.userRepository.findById(userId)
		if (!user) {
			this._logger.error('Не верный ID пользователя')
			throw new UnauthorizedException(
				'Ошибка обновления пароля пользователя'
			)
		}

		const { oldPassword, newPassword } = data

		const isPasswordValid = await verify(user.passwordHash, oldPassword)
		if (!isPasswordValid) {
			this._logger.error(
				`У пользователя ${user.id} переданный пароль не совпадает с паролем в БД`
			)
			throw new BadRequestException('Не верный пароль')
		}

		const passwords = await this.passwordHistoryRepository.findByUser(
			user.id,
			10
		)

		if (passwords && passwords.length > 0) {
			for (const record of passwords) {
				const isValid = await verify(record.password, newPassword)
				if (isValid)
					throw new BadRequestException(
						'Пароль уже использовался ранее'
					)
			}
		}

		try {
			const newPasswordHash = await hash(newPassword)

			await this.userRepository.update(user.id, {
				passwordChangeAt: Date.now().toString(),
				passwordHash: newPasswordHash
			})

			await this.passwordHistoryRepository.create({
				email: user.email,
				password: newPasswordHash,
				user: {
					connect: {
						id: user.id
					}
				}
			})

			return true
		} catch {
			return false
		}
	}

	/**
	 * Добавляет refresh token в cookies HTTP-ответа.
	 *
	 * Устанавливает cookie с refresh token'ом, который будет использоваться
	 * для обновления access token'а. Срок действия cookie определяется
	 * на основе конфигурации времени жизни refresh token'а.
	 *
	 * @param res - Объект HTTP-ответа (Response)
	 * @param token - Строка refresh token'а, которая будет установлена в cookie
	 */
	public addRefreshTokenToResponse(res: Response, token: string) {
		const expiresIn = new Date()
		expiresIn.setSeconds(
			expiresIn.getSeconds() +
				Math.floor(ms(this.REFRESH_TOKEN_EXPIRES) / 1000)
		)

		res.cookie(this.REFRESH_TOKEN_NAME, token, {
			httpOnly: true,
			domain: this.config.getOrThrow<string>('SERVER_DOMAIN'),
			expires: expiresIn,
			secure: true,
			sameSite: 'none'
		})
	}

	/**
	 * Удаляет refresh token из cookies в HTTP-ответе.
	 *
	 * Устанавливает cookie с именем refresh token'а в пустое значение
	 * и истекшим сроком действия, тем самым удаляя его на стороне клиента.
	 *
	 * @param res - Объект HTTP-ответа (Response)
	 */
	public removeRefreshTokenFromResponse(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			httpOnly: true,
			domain: this.config.getOrThrow<string>('SERVER_DOMAIN'),
			expires: new Date(0),
			secure: true,
			sameSite: 'none'
		})
	}

	/**
	 * Генерация новый токенов доступа и обновления
	 *
	 * @param refreshToken - Токен обновления пользователя
	 *
	 * @returns Объект, содержащий accessToken и refreshToken, а так же пользователя
	 */
	private async getNewTokens(refreshToken: string) {
		const result: IJwtPayload = await this.jwt.verifyAsync(refreshToken)
		if (!result)
			throw new UnauthorizedException('Не верный токен обновления')

		const user = await this.userRepository.findById(result.userId)
		if (!user) throw new UnauthorizedException('Не верный токен обновления')
		if (!user.employee) {
			this._logger.error(
				`У пользователя ${user.id} не найдена запись Employee`
			)
			throw new NotFoundException(
				'Не найдена запись сотрудника у пользователя'
			)
		}

		const tokens = this.issueTokens(
			user.id,
			user.employee.username,
			user.employee.role
		)

		return { user, ...tokens }
	}

	/**
	 * Генерирует пару JWT-токенов (access и refresh) для переданного пользователя.
	 *
	 * @param userId - Уникальный номер пользователя
	 * @param username - Имя пользователя сотрудника
	 * @param role - Роль сотрудника
	 *
	 * @returns Объект, содержащий accessToken и refreshToken (см. {@link ITokens})
	 *
	 * @example
	 * const { accessToken, refreshToken } = this.issueTokens(user);
	 *
	 */
	private issueTokens(userId: string, username: string, role: Role): ITokens {
		const data: IJwtPayload = {
			username: username,
			role: role,
			userId: userId
		}

		const accessToken = this.jwt.sign(data, {
			expiresIn: this.ACCESS_TOKEN_EXPIRES
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: this.REFRESH_TOKEN_EXPIRES
		})

		return { accessToken, refreshToken }
	}
}
