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
	CreateModuleRequest,
	CreateModuleResponse,
	DeleteModuleResponse,
	GetAllModuleResponse,
	ModuleFindByResponse,
	UpdateModuleRequest,
	UpdateModuleResponse
} from './dto'
import { ModuleService } from './module.service'

@Controller('modules')
export class ModuleController {
	constructor(private readonly moduleService: ModuleService) {}

	/**
	 * Получить список всех записей модуля направления
	 */
	@ApiOperation({
		summary: 'Получить список всех записей модуля направления'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: GetAllModuleResponse
	})
	@Get('/')
	@HttpCode(HttpStatus.OK)
	public getAll(): Promise<GetAllModuleResponse> {
		return this.moduleService.getAll()
	}

	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: ModuleFindByResponse
	})
	@Get('/find-by/id/:id')
	@HttpCode(HttpStatus.OK)
	public findById(@Param('id') id: string): Promise<ModuleFindByResponse> {
		return this.moduleService.findById(id)
	}

	/**
	 * Найти запись по коду модуля разработки
	 *
	 * @param code Уникальный код модуля разработки
	 */
	@ApiOperation({
		summary: 'Найти запись по коду модуля разработки'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: ModuleFindByResponse
	})
	@Get('/find-by/code/:code')
	@HttpCode(HttpStatus.OK)
	public findByCode(
		@Param('code') code: string
	): Promise<ModuleFindByResponse> {
		return this.moduleService.findByCode(code)
	}

	/**
	 * Найти запись по наименованию модуля разработки
	 *
	 * @param name Наименование модуля разработки
	 */
	@ApiOperation({
		summary: 'Найти запись по наименованию модуля разработки'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: ModuleFindByResponse
	})
	@Get('/find-by/name/:name')
	@HttpCode(HttpStatus.OK)
	public findByName(
		@Param('name') name: string
	): Promise<ModuleFindByResponse> {
		return this.moduleService.findByName(name)
	}

	/**
	 * Создание новой записи
	 *
	 * @param data Данные для создания записи
	 */
	@ApiOperation({
		summary: 'Создание новой записи'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: CreateModuleResponse
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Переданы ошибочные данные',
		type: ErrorResponse
	})
	@ApiBody({ type: CreateModuleRequest })
	@ApiBearerAuth()
	@Auth()
	@Post('/')
	@HttpCode(HttpStatus.OK)
	public create(
		@Body() data: CreateModuleRequest
	): Promise<CreateModuleResponse> {
		return this.moduleService.create(data)
	}

	/**
	 * Обновление записи модуля разработки
	 *
	 * @param id Уникальный идентификатор модуля разработки
	 * @param data Данные для обновления записи
	 */
	@ApiOperation({
		summary: 'Обновление записи модуля разработки'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: CreateModuleResponse
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Переданы ошибочные данные',
		type: ErrorResponse
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Модуль разработки для обновления не найден',
		type: ErrorResponse
	})
	@ApiBody({ type: UpdateModuleRequest })
	@ApiBearerAuth()
	@Auth()
	@Put('/:id')
	@HttpCode(HttpStatus.OK)
	public update(
		@Param('id') id: string,
		@Body() data: UpdateModuleRequest
	): Promise<UpdateModuleResponse> {
		return this.moduleService.update(id, data)
	}

	/**
	 * Удаление записи
	 *
	 * @param id Уникальный идентификатор модуля разработки
	 */
	@ApiOperation({
		summary: 'Удаление записи'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: DeleteModuleResponse
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Модуль разработки для удаления не найден',
		type: ErrorResponse
	})
	@ApiBearerAuth()
	@Auth()
	@Delete('/:id')
	@HttpCode(HttpStatus.OK)
	public delete(@Param('id') id: string): Promise<DeleteModuleResponse> {
		return this.moduleService.delete(id)
	}
}
