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

import { DevelopmentTypeService } from './development-type.service'
import {
	CreateDevelopmentTypeRequest,
	CreateDevelopmentTypeResponse,
	DeleteDevelopmentTypeResponse,
	DevelopmentTypeFindByResponse,
	GetAllDevelopmentTypeResponse,
	UpdateDevelopmentTypeRequest,
	UpdateDevelopmentTypeResponse
} from './dto'

@Controller('development-types')
export class DevelopmentTypeController {
	constructor(
		private readonly developmentTypeService: DevelopmentTypeService
	) {}

	/**
	 * Получение всех записей
	 */
	@ApiOperation({
		summary: 'Получение всех записей'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: GetAllDevelopmentTypeResponse
	})
	@Get('')
	@HttpCode(HttpStatus.OK)
	public getAll(): Promise<GetAllDevelopmentTypeResponse> {
		return this.developmentTypeService.getAll()
	}

	/**
	 * Найти запись по уникальному идентификатору
	 *
	 * @param id Уникальный идентификатор вида разработки
	 */
	@ApiOperation({
		summary: 'Найти запись по уникальному идентификатору'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: DevelopmentTypeFindByResponse
	})
	@Get('/find-by/id/:id')
	@HttpCode(HttpStatus.OK)
	public findById(
		@Param('id') id: string
	): Promise<DevelopmentTypeFindByResponse> {
		return this.developmentTypeService.findById(id)
	}

	/**
	 * Найти запись по коду вида разработки
	 *
	 * @param code Код вида разработки
	 */
	@ApiOperation({
		summary: 'Найти запись по коду вида разработки'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: DevelopmentTypeFindByResponse
	})
	@Get('/find-by/code/:code')
	@HttpCode(HttpStatus.OK)
	public findByCode(
		@Param('code') code: string
	): Promise<DevelopmentTypeFindByResponse> {
		return this.developmentTypeService.findByCode(code)
	}

	/**
	 * Найти запись по наименованию вида разработки
	 *
	 * @param name Наименование вида разработки
	 */
	@ApiOperation({
		summary: 'Найти запись по наименованию вида разработки'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: DevelopmentTypeFindByResponse
	})
	@Get('/find-by/name/:name')
	@HttpCode(HttpStatus.OK)
	public findByName(
		@Param('name') name: string
	): Promise<DevelopmentTypeFindByResponse> {
		return this.developmentTypeService.findByName(name)
	}

	/**
	 * Создание новой записи вида разработки
	 *
	 * @param data Данные для создания записи
	 */
	@ApiOperation({
		summary: 'Создание новой записи вида разработки'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: CreateDevelopmentTypeResponse
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Данные переданные с ошибкой',
		type: ErrorResponse
	})
	@ApiBody({ type: CreateDevelopmentTypeRequest })
	@ApiBearerAuth()
	@Auth()
	@Post('')
	@HttpCode(HttpStatus.OK)
	public create(
		@Body() data: CreateDevelopmentTypeRequest
	): Promise<CreateDevelopmentTypeResponse> {
		return this.developmentTypeService.create(data)
	}

	/**
	 * Обновление записи вида разработки
	 *
	 * @param id Уникальный идентификатор вида разработки
	 * @param data Данные для обновления записи
	 */
	@ApiOperation({
		summary: 'Обновление записи вида разработки'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: UpdateDevelopmentTypeResponse
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Данные переданные с ошибкой',
		type: ErrorResponse
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Запись для обновления не найден',
		type: ErrorResponse
	})
	@ApiBearerAuth()
	@Auth()
	@Put('/:id')
	@HttpCode(HttpStatus.OK)
	public update(
		@Param('id') id: string,
		@Body() data: UpdateDevelopmentTypeRequest
	): Promise<UpdateDevelopmentTypeResponse> {
		return this.developmentTypeService.update(id, data)
	}

	/**
	 * Удаление записи вида разработки
	 *
	 * @param id Уникальный идентификатор
	 */
	@ApiOperation({
		summary: 'Удаление записи вида разработки'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: UpdateDevelopmentTypeResponse
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Запись для обновления не найден',
		type: ErrorResponse
	})
	@ApiBearerAuth()
	@Auth()
	@Delete('/:id')
	@HttpCode(HttpStatus.OK)
	public delete(
		@Param('id') id: string
	): Promise<DeleteDevelopmentTypeResponse> {
		return this.developmentTypeService.delete(id)
	}
}
