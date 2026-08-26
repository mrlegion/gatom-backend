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
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { Auth } from '../../../shared/decorators'

import {
	CreateOrganizationRequest,
	CreateOrganizationResponse,
	DeleteOrganizationResponse,
	GetByIdsRequest,
	GetOrganizationResponse,
	GetOrganizationsResponse,
	UpdateOrganizationRequest,
	UpdateOrganizationResponse
} from './dto'
import { OrganizationService } from './organization.service'

@Controller('organizations')
export class OrganizationController {
	constructor(private readonly organizationService: OrganizationService) {}

	/**
	 * Получить все записи организации
	 *
	 * @returns Массив данных организаций
	 */
	@ApiOperation({
		summary: 'Получить все записи организации'
	})
	@ApiResponse({
		status: HttpStatus.OK
	})
	@Get()
	@HttpCode(HttpStatus.OK)
	public async getAll(): Promise<GetOrganizationsResponse> {
		return this.organizationService.getAll()
	}

	/**
	 * Получение организации по ID
	 *
	 * @param organizationId - Уникальный номер Организации
	 *
	 * @returns Объект найденной организации или Null
	 */
	@ApiOperation({
		summary: 'Найти запись по ID'
	})
	@Get('find-by/id/:id')
	@HttpCode(HttpStatus.OK)
	public async findById(
		@Param('id') organizationId: string
	): Promise<GetOrganizationResponse> {
		return this.organizationService.findById(organizationId)
	}

	/**
	 * Найти запись по наименованию
	 *
	 * @param organizationTitle - Наименование организации
	 *
	 * @returns Найденый объект или null
	 */
	@ApiOperation({
		summary: 'Найти запись по наименованию'
	})
	@ApiResponse({
		status: HttpStatus.OK
	})
	@Get('find-by/title/:title')
	@HttpCode(HttpStatus.OK)
	public async findByTitle(@Param('title') organizationTitle: string) {
		return this.organizationService.findByTitle(organizationTitle)
	}

	/**
	 * Найти записи по Уникальному идентификатору
	 *
	 * @param data - Список уникальных идентификаторов
	 *
	 * @returns Массив объектов организаций
	 */
	@ApiOperation({
		summary: 'Найти записи по Уникальному идентификатору'
	})
	@ApiResponse({
		status: HttpStatus.OK
	})
	@Post('/find-by/ids')
	@HttpCode(HttpStatus.OK)
	public async getByIds(@Body() data: GetByIdsRequest) {
		return this.organizationService.getByIds(data)
	}

	/**
	 * Создание новой записи Организации
	 *
	 * @param data - Данные для создания записи
	 *
	 * @returns - Объект созданный по переданным данным
	 */
	@ApiOperation({
		summary: 'Создание новой записи Организации'
	})
	@ApiBearerAuth()
	@Auth()
	@ApiResponse({
		status: HttpStatus.OK
	})
	@Post('/')
	@HttpCode(HttpStatus.OK)
	public async create(
		@Body() data: CreateOrganizationRequest
	): Promise<CreateOrganizationResponse> {
		return this.organizationService.create(data)
	}

	/**
	 * Обновление элемента организации
	 *
	 * @param organizationId - Уникальный код Организации
	 * @param data - Данные для обновления
	 *
	 * @returns - Обновленный объект Организации
	 */
	@ApiOperation({
		summary: 'Обновление элемента организации'
	})
	@ApiBearerAuth()
	@Auth()
	@Put(':id')
	@HttpCode(HttpStatus.OK)
	public async update(
		@Param('id') organizationId: string,
		@Body() data: UpdateOrganizationRequest
	): Promise<UpdateOrganizationResponse> {
		return this.organizationService.update(organizationId, data)
	}

	/**
	 * Удаление элемента Организации
	 *
	 * @param organizationId - Уникальный номер Организации
	 *
	 * @returns Статус выполнения операции
	 */
	@ApiOperation({
		summary: 'Удаление элемента Организации'
	})
	@ApiBearerAuth()
	@Auth()
	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	public async delete(
		@Param('id') organizationId: string
	): Promise<DeleteOrganizationResponse> {
		return this.organizationService.delete(organizationId)
	}
}
