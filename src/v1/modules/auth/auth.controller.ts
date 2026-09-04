import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiResponse
} from '@nestjs/swagger'
import type { Request, Response } from 'express'

import { Auth } from '../../../shared/decorators'
import { CurrentUser } from '../../../shared/decorators/current-user.decorator'
import { ErrorResponse } from '../../../shared/response'
import {
	ErrorExampleFactory,
	IUserResponse,
	UserExampleFactory
} from '../../../shared/types'

import { AuthService } from './auth.service'
import {
	ChangePasswordRequest,
	LoginRequest,
	LoginResponse,
	RefreshResponse,
	RegisterRequest,
	RegisterResponse
} from './dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	/**
	 * Выполняет вход пользователя в систему.
	 *
	 * @param res - Запрос пользователя (см. {@link Response})
	 * @param data - Данные для аутентификации, включая email и пароль (см. {@link LoginRequest})
	 *
	 * @returns Возвращает токен доступа и информацию о пользователе (см. {@link LoginResponse})
	 */
	@ApiOperation({
		summary: 'Выполняет вход пользователя в систему'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: LoginResponse
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		type: ErrorResponse,
		example: ErrorExampleFactory.badRequest()
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		type: ErrorResponse,
		example: ErrorExampleFactory.notFound()
	})
	@ApiBody({ type: LoginRequest })
	@Post('login')
	@HttpCode(HttpStatus.OK)
	public async login(
		@Res({ passthrough: true }) res: Response,
		@Body() data: LoginRequest
	): Promise<LoginResponse> {
		return this.authService.login(res, data)
	}

	/**
	 * Регистрация нового пользователя в системе
	 *
	 * @param res - Запрос пользователя (см. {@link Response})
	 * @param data - Данные для регистрации нового пользователя (см. {@link RegisterRequest})
	 *
	 * @returns Возвращает статус выполнения операции (см. {@link RegisterResponse})
	 */
	@ApiOperation({
		summary: 'Регистрация в системе'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: LoginResponse
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		type: ErrorResponse,
		example: ErrorExampleFactory.badRequest()
	})
	@ApiBody({
		type: RegisterRequest,
		examples: {
			'Регистрация пользователя в системе': {
				value: UserExampleFactory.register()
			}
		}
	})
	@Post('register')
	@HttpCode(HttpStatus.OK)
	public async register(
		@Res({ passthrough: true }) res: Response,
		@Body() data: RegisterRequest
	): Promise<RegisterResponse> {
		return this.authService.register(res, data)
	}

	/**
	 * Обновления токенов доступа пользователя
	 *
	 * @param req - Объект HTTP-запроса ({@link Request})
	 * @param res - Объект HTTP-ответа ({@link Response})
	 *
	 * @returns Ответ, содержащий токен обновления и доступа, а так же данных пользователя {@link RefreshResponse}
	 */
	@ApiOperation({
		summary: 'Обновление токенов'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: RefreshResponse
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		type: ErrorResponse,
		example: ErrorExampleFactory.unauthorized()
	})
	@ApiBearerAuth()
	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	public async refresh(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	): Promise<RefreshResponse> {
		return this.authService.refresh(res, req)
	}

	/**
	 * Выход из системы
	 *
	 * @param res - Объект HTTP-ответа ({@link Response})
	 *
	 * @returns Ответ, успешного выполнения запроса
	 */
	@ApiOperation({
		summary: 'Выход из системы'
	})
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	public async logout(
		@Res({ passthrough: true }) res: Response
	): Promise<boolean> {
		return this.authService.logout(res)
	}

	/**
	 * Смена пароля пользователя
	 *
	 * @param userId - Уникальный идентификатор пользователя
	 * @param data - Данные для обновления пароля (см. {@link ChangePasswordRequest})
	 *
	 * @returns Ответ, об успешности выполнения смены пароля пользователя (boolean)
	 */
	@ApiOperation({
		summary: 'Смена пароля пользователя'
	})
	@ApiBody({ type: ChangePasswordRequest })
	@ApiBearerAuth()
	@ApiResponse({
		status: HttpStatus.OK,
		type: Boolean,
		description:
			'Ответ, об успешности выполнения смены пароля пользователя',
		example: true
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		type: ErrorResponse,
		description: 'Не верный пароль пользователя',
		example: ErrorExampleFactory.badRequest()
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		type: ErrorResponse,
		description: 'Пароль уже использовался ранее',
		example: ErrorExampleFactory.badRequest()
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		type: ErrorResponse,
		description: 'Ошибка обновления пароля пользователя',
		example: ErrorExampleFactory.unauthorized()
	})
	@Auth()
	@Post('update-password')
	@HttpCode(HttpStatus.OK)
	public async changePassword(
		@CurrentUser('id') userId: string,
		@Body() data: ChangePasswordRequest
	) {
		return this.authService.changePassword(userId, data)
	}
}
