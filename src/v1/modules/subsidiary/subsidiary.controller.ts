import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	Put,
	Query
} from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { CreateSubsidiaryRequest, UpdateSubsidiaryRequest } from './dto/request'
import { GetAllSubsidiaryResponse } from './dto/response/get-all.response'
import { SubsidiaryService } from './subsidiary.service'

@Controller('subsidiaries')
export class SubsidiaryController {
	constructor(private readonly subsidiaryService: SubsidiaryService) {}

	@ApiOperation({
		summary: 'Получение всех данных Подразделений'
	})
	@Get()
	@HttpCode(HttpStatus.OK)
	public getAll(): Promise<GetAllSubsidiaryResponse> {
		return this.subsidiaryService.getAll()
	}

	@ApiOperation({
		summary: 'Найти по ID'
	})
	@Get('/find-by/id/:id')
	@HttpCode(HttpStatus.OK)
	public findById(@Param('id') id: string) {
		return this.subsidiaryService.findById(id)
	}

	@ApiOperation({
		summary: 'Найти по Наименованию'
	})
	@Get('/find-by/title/:title')
	@HttpCode(HttpStatus.OK)
	public findByTitle(@Param('title') title: string) {
		return this.subsidiaryService.findByTitle(title)
	}

	@ApiOperation({
		summary: 'Найти по Организации'
	})
	@Get('/find-by/organization/:organizationId')
	@HttpCode(HttpStatus.OK)
	public findByOrganization(@Param('organizationId') organizationId: string) {
		return this.subsidiaryService.findByOrganization(organizationId)
	}

	@ApiOperation({
		summary: 'Создание новой записи'
	})
	@Post()
	@HttpCode(HttpStatus.OK)
	public create(@Body() data: CreateSubsidiaryRequest) {
		return this.subsidiaryService.create(data)
	}

	@ApiOperation({
		summary: 'Обновление записи'
	})
	@Put('/:id')
	@HttpCode(HttpStatus.OK)
	public update(
		@Param('id') id: string,
		@Body() data: UpdateSubsidiaryRequest
	) {
		return this.subsidiaryService.update(id, data)
	}

	@ApiOperation({
		summary: 'Изменение связи Подразделения и Организации'
	})
	@Patch('/connect/:id')
	@HttpCode(HttpStatus.OK)
	public connectToOrganization(
		@Param('id') id: string,
		@Query('organizationId') organizationId: string
	) {
		return this.subsidiaryService.connectToOrganization(id, organizationId)
	}

	@ApiOperation({
		summary: 'Удаление записи'
	})
	@Delete('/:id')
	@HttpCode(HttpStatus.OK)
	public delete(@Param('id') id: string) {
		return this.subsidiaryService.delete(id)
	}
}
