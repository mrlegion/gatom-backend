import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiResponse
} from '@nestjs/swagger'

import { Auth } from '../../../shared/decorators'
import { ErrorResponse } from '../../../shared/response'

import {
	CreateSystemRequest,
	CreateSystemResponse,
	DeleteSystemResponse,
	GetAllSystemResponse,
	SystemFindByManyResponse,
	SystemFindByResponse,
	UpdateSystemRequest,
	UpdateSystemResponse
} from './dto'
import { SystemService } from './system.service'

@Controller('systems')
export class SystemController {
	constructor(private readonly systemService: SystemService) {}

	/**
	 * Получить все записи
	 *
	 * @returns Массив записей со статусом выполнения запроса
	 */
	@ApiOperation({
		summary: 'Получить все записи'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: GetAllSystemResponse
	})
	@Get('')
	@HttpCode(HttpStatus.OK)
	public getAll(): Promise<GetAllSystemResponse> {
		return this.systemService.getAll()
	}

	/**
	 * Получить запись по уникальному идентификатору
	 *
	 * @param id Уникальный идентификатор
	 * @returns Ответ со статусом выполнения запроса и найденной системой
	 */
	@ApiOperation({
		summary: 'Получить запись по уникальному идентификатору'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: SystemFindByResponse
	})
	@Get('/find-by/id/:id')
	@HttpCode(HttpStatus.OK)
	public findById(@Param('id') id: string): Promise<SystemFindByResponse> {
		return this.systemService.findById(id)
	}

	/**
	 * Найти по коду системы
	 *
	 * @param code Код системы
	 * @returns Ответ со статусом выполнения запрос и найденной системой
	 */
	@ApiOperation({
		summary: 'Найти по коду системы'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: SystemFindByResponse
	})
	@Get('/find-by/code/:code')
	@HttpCode(HttpStatus.OK)
	public findByCode(
		@Param('code') code: string
	): Promise<SystemFindByResponse> {
		return this.systemService.findByCode(code.toUpperCase()) // код системы всегда в верхнем регистре
	}

	/**
	 * Найти по наименованию
	 *
	 * @param name Наименование системы
	 * @returns Ответ со статусом выполнения запрос и найденной системой
	 */
	@ApiOperation({
		summary: 'Найти по наименованию'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: SystemFindByResponse
	})
	@Get('/find-by/name/:name')
	@HttpCode(HttpStatus.OK)
	public findByName(
		@Param('name') name: string
	): Promise<SystemFindByResponse> {
		return this.systemService.findByName(name)
	}

	/**
	 * Найти системы по префиксу
	 *
	 * @param prefix Префикс системы
	 * @returns Ответ со статусом выполнения запроса и массив найденных систем
	 */
	@ApiOperation({
		summary: 'Найти системы по префиксу'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: SystemFindByManyResponse
	})
	@Get('/find-by/prefix/:prefix')
	@HttpCode(HttpStatus.OK)
	public findByPrefix(
		@Param('prefix') prefix: string
	): Promise<SystemFindByManyResponse> {
		return this.systemService.findByPrefix(prefix.toUpperCase()) // Префикс системы всегда в верхнем регистре
	}

	/**
	 * Создание новой записи системы
	 *
	 * @param data Данные для создания
	 * @returns Ответ со статусом выполнения запроса и объектом системы или Null
	 */
	@ApiOperation({
		summary: 'Создание новой записи системы'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполение запроса',
		type: CreateSystemResponse
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Переданны не верные данные',
		type: ErrorResponse
	})
	@ApiBody({ type: CreateSystemRequest })
	@ApiBearerAuth()
	@Auth()
	@Post('')
	@HttpCode(HttpStatus.OK)
	public create(
		@Body() data: CreateSystemRequest
	): Promise<CreateSystemResponse> {
		return this.systemService.create(data)
	}

	/**
	 * Обновление данных системы
	 *
	 * @param id Уникальный идентификатор
	 * @param data Данные для обновления
	 * @returns Ответ со статусом выполнения запроса и объектом системы или Null
	 */
	@ApiOperation({
		summary: 'Обновление данных системы'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: UpdateSystemResponse
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Система для обновления не найдена',
		type: ErrorResponse
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Переданны не верные данные',
		type: ErrorResponse
	})
	@ApiBody({ type: UpdateSystemRequest })
	@ApiBearerAuth()
	@Auth()
	@Put('/:id')
	@HttpCode(HttpStatus.OK)
	public update(
		@Param('id') id: string,
		@Body() data: UpdateSystemRequest
	): Promise<UpdateSystemResponse> {
		return this.systemService.update(id, data)
	}

	/**
	 * Удаление записи
	 *
	 * @param id Уникальный идентификатор системы
	 * @returns Ответ на запрос удалениея со статусом удаления
	 */
	@ApiOperation({
		summary: 'Удаление записи'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: DeleteSystemResponse
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Система для удаления не найдена',
		type: ErrorResponse
	})
	@ApiBearerAuth()
	@Auth()
	@Delete('/:id')
	@HttpCode(HttpStatus.OK)
	public delete(@Param('id') id: string): Promise<DeleteSystemResponse> {
		return this.systemService.delete(id)
	}
}
