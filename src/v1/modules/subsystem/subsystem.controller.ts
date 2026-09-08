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
	CreateSubsystemRequest,
	CreateSubsystemResponse,
	DeleteSubsystemResponse,
	GetAllSubsystemResponse,
	SubsystemFindByManyResponse,
	SubsystemFindByResponse,
	UpdateSubsystemRequest,
	UpdateSubsystemResponse
} from './dto'
import { SubsystemService } from './subsystem.service'

@Controller('subsystems')
export class SubsystemController {
	constructor(private readonly subsystemService: SubsystemService) {}

	/**
	 * Получить все записи подсистем
	 */
	@ApiOperation({
		summary: 'Получить все записи подсистем'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: GetAllSubsystemResponse
	})
	@Get('')
	@HttpCode(HttpStatus.OK)
	public getAll(): Promise<GetAllSubsystemResponse> {
		return this.subsystemService.getAll()
	}

	/**
	 * Найти запись по уникальному идентификатору
	 *
	 * @param id Уникальный идентификатор
	 */
	@ApiOperation({
		summary: 'Найти запись по уникальному идентификатору'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: SubsystemFindByResponse
	})
	@Get('/find-by/id/:id')
	@HttpCode(HttpStatus.OK)
	public findById(@Param('id') id: string): Promise<SubsystemFindByResponse> {
		return this.subsystemService.findById(id)
	}

	/**
	 * Найти запись по наименованию
	 *
	 * @param name Наименование подсистемы
	 */
	@ApiOperation({
		summary: 'Найти запись по наименованию'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: SubsystemFindByResponse
	})
	@Get('/find-by/name/:name')
	@HttpCode(HttpStatus.OK)
	public findByName(
		@Param('name') name: string
	): Promise<SubsystemFindByResponse> {
		return this.subsystemService.findByName(name)
	}

	/**
	 * Найти запись по коду подсистемы
	 *
	 * @param code Код подсистемы
	 */
	@ApiOperation({
		summary: 'Найти запись по коду подсистемы'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: SubsystemFindByResponse
	})
	@Get('/find-by/code/:code')
	@HttpCode(HttpStatus.OK)
	public findByCode(
		@Param('code') code: string
	): Promise<SubsystemFindByResponse> {
		return this.subsystemService.findByCode(code)
	}

	/**
	 * Найти подсистемы по уникальному идентификатору системы
	 *
	 * @param systemId Уникальный идентификатор системы
	 */
	@ApiOperation({
		summary: 'Найти подсистемы по уникальному идентификатору системы'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: SubsystemFindByManyResponse
	})
	@Get('/find-by/system/:systemId')
	@HttpCode(HttpStatus.OK)
	public findBySystem(
		@Param('systemId') systemId: string
	): Promise<SubsystemFindByManyResponse> {
		return this.subsystemService.findBySystemId(systemId)
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
		type: CreateSubsystemResponse
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Переданны не верные данные',
		type: ErrorResponse
	})
	@ApiBody({ type: CreateSubsystemRequest })
	@ApiBearerAuth()
	@Auth()
	@Post('')
	@HttpCode(HttpStatus.OK)
	public create(
		@Body() data: CreateSubsystemRequest
	): Promise<CreateSubsystemResponse> {
		return this.subsystemService.create(data)
	}

	/**
	 * Обновление записи подсистемы
	 *
	 * @param id Уникальный идентификатор подсистемы
	 * @param data Данные для обновления
	 */
	@ApiOperation({
		summary: 'Обновление записи'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: UpdateSubsystemResponse
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Подсистема для обновления не найдена',
		type: ErrorResponse
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Переданны не верные данные',
		type: ErrorResponse
	})
	@ApiBody({ type: UpdateSubsystemRequest })
	@ApiBearerAuth()
	@Auth()
	@Put('/:id')
	@HttpCode(HttpStatus.OK)
	public update(
		@Param('id') id: string,
		@Body() data: UpdateSubsystemRequest
	): Promise<UpdateSubsystemResponse> {
		return this.subsystemService.update(id, data)
	}

	/**
	 * Удаление записи подсистемы
	 *
	 * @param id Уникальный идентификатор подсистемы
	 */
	@ApiOperation({
		summary: 'Удаление записи'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: DeleteSubsystemResponse
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Подсистема для обновления не найдена',
		type: ErrorResponse
	})
	@ApiBearerAuth()
	@Auth()
	@Delete('/:id')
	@HttpCode(HttpStatus.OK)
	public delete(@Param('id') id: string): Promise<DeleteSubsystemResponse> {
		return this.subsystemService.delete(id)
	}
}
