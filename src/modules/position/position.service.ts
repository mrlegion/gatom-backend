import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException
} from '@nestjs/common'

import { Position } from '../../../prisma/generated/client'
import { PositionRepository } from '../../repositories'

import {
	CreatePositionResponse,
	PositionCreateRequest,
	PositionUpdateRequest,
	UpdatePositionResponse
} from './dto'

@Injectable()
export class PositionService {
	private readonly _logger: Logger

	public constructor(
		private readonly positionRepository: PositionRepository
	) {
		this._logger = new Logger(PositionService.name)
	}

	/**
	 * Получение всех записей филиала
	 *
	 * @returns Массив объектов филиалов
	 */
	public async getAll(): Promise<Position[]> {
		return this.positionRepository.findAll()
	}

	/**
	 * Получение должности по ID
	 *
	 * @param positionId - Уникальный код должности
	 *
	 * @returns Объект должности
	 */
	public async findById(positionId: string) {
		return this.positionRepository.findById(positionId)
	}

	/**
	 * Создание новой записи должности
	 *
	 * @param data - Данные для создания записи должности
	 *
	 * @returns Объект созданной записи должности
	 */
	public async create(
		data: PositionCreateRequest
	): Promise<CreatePositionResponse> {
		const { title } = data

		const isTitleExist = await this.positionRepository.findByTitle(title)
		if (isTitleExist)
			throw new BadRequestException(
				`Должность с наименованием ${title} уже существует`
			)

		try {
			const position = await this.positionRepository.create({ title })

			return {
				success: true,
				position
			}
		} catch (e) {
			this._logger.error(`Ошибка создания записи должности. `, e)

			throw new InternalServerErrorException(
				'Ошибка создания записи должности'
			)
		}
	}

	/**
	 * Обновление записи должности
	 *
	 * @param positionId - Уникальный номер должности
	 * @param data - Данные для обновления должности
	 *
	 * @returns Объект успешности выполнения операции и обновленная должность
	 */
	public async update(
		positionId: string,
		data: PositionUpdateRequest
	): Promise<UpdatePositionResponse> {
		const { title, isNonActive } = data

		const positionExist = await this.positionRepository.findById(positionId)
		if (!positionExist) throw new NotFoundException('Должность не найдена')

		const isTitleExist = await this.positionRepository.findByTitle(title)
		if (isTitleExist)
			throw new BadRequestException(
				`Должность с наименованием ${title} уже существует`
			)

		try {
			const position = await this.positionRepository.update(positionId, {
				title,
				isNonActive
			})

			return {
				success: true,
				position
			}
		} catch {
			this._logger.error(
				`Ошибка обновления записи ${positionId}. Данные обновления: `,
				title,
				isNonActive
			)

			throw new InternalServerErrorException(
				'Ошибка обновления записи должности'
			)
		}
	}

	/**
	 * Удаление должности
	 *
	 * @param positionId - Уникальный номер должности
	 *
	 * @returns Булевое представление выполнение операции
	 */
	public async delete(positionId: string) {
		try {
			await this.positionRepository.delete(positionId)

			return true
		} catch (e) {
			this._logger.error(
				`Не удалось удалить должность с ID: ${positionId}`,
				e
			)

			return false
		}
	}
}
