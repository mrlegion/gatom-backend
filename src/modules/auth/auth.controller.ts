import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import type { Request, Response } from 'express'

import { ErrorResponse } from '../../shared/response'

import { AuthService } from './auth.service'
import {
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
	 * @returns Возвращает токен доступа и информацию о пользователе (см. {@link LoginResponse})
	 * @throws {NotFoundException} Если пользователь с указанным email не найден
	 * @throws {BadRequestException} Если переданы некорректные данные (например, неверный пароль)
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
		type: ErrorResponse
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		type: ErrorResponse
	})
	@ApiBody({ type: LoginRequest })
	@Post('/login')
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
	 * @returns Возвращает статус выполнения операции (см. {@link RegisterResponse})
	 * @throws {BadRequestException} Если переданы некорректные данные
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
		type: ErrorResponse
	})
	@ApiBody({ type: RegisterRequest })
	@Post('/register')
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
		type: ErrorResponse
	})
	@Post('/refresh')
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
	@Post('/logout')
	@HttpCode(HttpStatus.OK)
	public async logout(
		@Res({ passthrough: true }) res: Response
	): Promise<boolean> {
		return this.authService.logout(res)
	}
}
