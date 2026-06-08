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

import { Position } from '../../../prisma/generated/client'
import { Auth } from '../../shared/decorators'

import { PositionCreateRequest, PositionUpdateRequest } from './dto'
import { PositionService } from './position.service'

@Controller('positions')
export class PositionController {
	constructor(private readonly positionService: PositionService) {}

	/**
	 * Получение всех записей филиала
	 *
	 * @returns Массив объектов филиалов
	 */
	@ApiOperation({
		summary: 'Получение всех записей должности'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение операции'
	})
	@Get()
	@HttpCode(HttpStatus.OK)
	public async getAll(): Promise<Position[]> {
		return this.positionService.getAll()
	}

	/**
	 * Получение должности по ID
	 *
	 * @param positionId - Уникальный код должности
	 *
	 * @returns Объект должности
	 */
	@ApiOperation({
		summary: 'Получение должности по ID'
	})
	@Get('find-by-id/:id')
	@HttpCode(HttpStatus.OK)
	public async findById(@Param('id') positionId: string) {
		return this.positionService.findById(positionId)
	}

	/**
	 * Создание новой записи должности
	 *
	 * @param data - Данные для создания записи должности
	 *
	 * @returns Объект созданной записи должности
	 */
	@ApiOperation({
		summary: 'Создание новой записи должности'
	})
	@ApiBody({ type: PositionCreateRequest })
	@ApiBearerAuth()
	@Auth()
	@Post()
	@HttpCode(HttpStatus.OK)
	public async create(@Body() data: PositionCreateRequest) {
		return this.positionService.create(data)
	}

	/**
	 * Обновление записи должности
	 *
	 * @param positionId - Уникальный номер должности
	 * @param data - Данные для обновления должности
	 *
	 * @returns Объект успешности выполнения операции и обновленная должность
	 */
	@ApiOperation({
		summary: 'Обновление записи должности'
	})
	@ApiBearerAuth()
	@Auth()
	@Put(':id')
	@HttpCode(HttpStatus.OK)
	public async update(
		@Param('id') positionId: string,
		@Body() data: PositionUpdateRequest
	) {
		return this.positionService.update(positionId, data)
	}

	/**
	 * Удаление записи должности
	 *
	 * @param positonId - Уникальный номер должности
	 *
	 * @return Болевое представление выполнение операции
	 */
	@ApiOperation({
		summary: 'Удаление позиции'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: Boolean
	})
	@ApiBearerAuth()
	@Auth()
	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	public async delete(@Param('id') positonId: string) {
		return this.positionService.delete(positonId)
	}
}
