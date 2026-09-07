import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import {
	GetAllSystemResponse,
	SystemFindByManyResponse,
	SystemFindByResponse
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
	public async getAll(): Promise<GetAllSystemResponse> {
		return await this.systemService.getAll()
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
	@Get('/:id')
	@HttpCode(HttpStatus.OK)
	public async findById(
		@Param('id') id: string
	): Promise<SystemFindByResponse> {
		return await this.systemService.findById(id)
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
	@Get('/:code')
	@HttpCode(HttpStatus.OK)
	public async findByCode(
		@Param('code') code: string
	): Promise<SystemFindByResponse> {
		return await this.systemService.findByCode(code)
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
	@Get('/:name')
	@HttpCode(HttpStatus.OK)
	public async findByName(
		@Param('name') name: string
	): Promise<SystemFindByResponse> {
		return await this.systemService.findByName(name)
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
		description: 'Успешное выполнение запроас',
		type: SystemFindByManyResponse
	})
	@Get('/:prefix')
	@HttpCode(HttpStatus.OK)
	public async findByPrefix(
		@Param('prefix') prefix: string
	): Promise<SystemFindByManyResponse> {
		return await this.systemService.findByPrefix(prefix)
	}
}
