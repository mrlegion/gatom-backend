import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'

import { DevelopmentTypeRepository } from '../../../repositories'

import {
	CreateDevelopmentTypeRequest,
	CreateDevelopmentTypeResponse,
	DeleteDevelopmentTypeResponse,
	DevelopmentTypeFindByResponse,
	GetAllDevelopmentTypeResponse,
	UpdateDevelopmentTypeRequest,
	UpdateDevelopmentTypeResponse
} from './dto'

@Injectable()
export class DevelopmentTypeService {
	public constructor(
		private readonly developmentTypeRepository: DevelopmentTypeRepository
	) {}

	/**
	 * Найти все записи
	 *
	 * @returns Массив записей
	 */
	public async getAll(): Promise<GetAllDevelopmentTypeResponse> {
		const developmentTypes = await this.developmentTypeRepository.getAll()

		return {
			data: {
				status: developmentTypes.length ? 'OK' : 'NOT_FOUND',
				developmentTypes
			}
		}
	}

	/**
	 * Найти по Уникальному идентификатору
	 *
	 * @param id Уникальный идентификатор
	 * @returns Найденый объект или Null
	 */
	public async findById(id: string): Promise<DevelopmentTypeFindByResponse> {
		const developmentType =
			await this.developmentTypeRepository.findById(id)

		return {
			data: {
				status: developmentType ? 'OK' : 'NOT_FOUND',
				developmentType
			}
		}
	}

	/**
	 * Найти по коду типа доработки
	 *
	 * @param code Код типа доработки
	 * @returns Найденый объект или Null
	 */
	public async findByCode(
		code: string
	): Promise<DevelopmentTypeFindByResponse> {
		const developmentType =
			await this.developmentTypeRepository.findByCode(code)

		return {
			data: {
				status: developmentType ? 'OK' : 'NOT_FOUND',
				developmentType
			}
		}
	}

	/**
	 * Найти по наименованию типа доработки
	 *
	 * @param name Наименование типа доработки
	 * @returns Найденый объект или Null
	 */
	public async findByName(
		name: string
	): Promise<DevelopmentTypeFindByResponse> {
		const developmentType =
			await this.developmentTypeRepository.findByName(name)

		return {
			data: {
				status: developmentType ? 'OK' : 'NOT_FOUND',
				developmentType
			}
		}
	}

	/**
	 * Создание новой записи
	 *
	 * @param dto Данные для создания
	 * @returns Данные ответа со статусов выполнения операции и объектом типа доработки или Null
	 *
	 * @throws Ошибка входных данных от пользователя или ошибка создания записи
	 */
	public async create(
		dto: CreateDevelopmentTypeRequest
	): Promise<CreateDevelopmentTypeResponse> {
		const { name, code } = dto

		const isNameExist =
			await this.developmentTypeRepository.findByName(name)
		if (isNameExist)
			throw new BadRequestException(
				`Тип доработки с наименованием "${name}" уже существует`
			)

		const isCodeExist =
			await this.developmentTypeRepository.findByCode(code)
		if (isCodeExist)
			throw new BadRequestException(
				`Тип доработки с кодом "${code}" уже существует`
			)

		const developmentType = await this.developmentTypeRepository.create({
			...dto
		})
		if (!developmentType)
			return {
				data: {
					status: 'ERROR',
					developmentType
				}
			}

		return {
			data: {
				status: 'OK',
				developmentType
			}
		}
	}

	/**
	 * Обновление записи типа доработки
	 *
	 * @param id Уникальный идентификатор типа доработки
	 * @param dto Данные для обновления
	 * @returns Данные ответа со статусом выполнения операции и объектом типа доработки или Null
	 *
	 * @throws Ошибка входных данных от пользователя или ошибка обновления записи
	 */
	public async update(
		id: string,
		dto: UpdateDevelopmentTypeRequest
	): Promise<UpdateDevelopmentTypeResponse> {
		const { name, code } = dto

		// Проверка существования типа доработки по id
		const isDevelopmentTypeExist =
			await this.developmentTypeRepository.findById(id)
		if (!isDevelopmentTypeExist)
			throw new NotFoundException(
				'Тип доработки для обновления не найден'
			)

		// Проверка уникальности кода (исключая текущую запись)
		const isCodeExist =
			await this.developmentTypeRepository.findByCode(code)
		if (isCodeExist && isCodeExist.id !== id) {
			throw new BadRequestException(
				`Тип доработки с кодом "${code}" уже существует`
			)
		}

		// Проверка уникальности названия (исключая текущую запись)
		const isNameExist =
			await this.developmentTypeRepository.findByName(name)
		if (isNameExist && isNameExist.id !== id) {
			throw new BadRequestException(
				`Тип доработки с наименованием "${name}" уже существует`
			)
		}

		const developmentType = await this.developmentTypeRepository.update(
			id,
			{
				...dto
			}
		)
		if (!developmentType) {
			return {
				data: {
					status: 'ERROR',
					developmentType
				}
			}
		}

		return {
			data: {
				status: 'OK',
				developmentType
			}
		}
	}

	/**
	 * Удаление записи по уникальному идентификатору
	 *
	 * @param id Уникальный идентификатор
	 * @returns Статус выполнения удаления
	 * @throws Ошибка обработки удаления
	 */
	public async delete(id: string): Promise<DeleteDevelopmentTypeResponse> {
		const isDevelopmentTypeExist =
			await this.developmentTypeRepository.findById(id)
		if (!isDevelopmentTypeExist)
			throw new NotFoundException('Тип доработки для удаления не найден')

		const status = await this.developmentTypeRepository.delete(id)

		return {
			data: {
				status: status ? 'OK' : 'ERROR'
			}
		}
	}
}
