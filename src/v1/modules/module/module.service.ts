import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'

import { ModuleRepository } from '../../../repositories'

import {
	CreateModuleRequest,
	CreateModuleResponse,
	DeleteModuleResponse,
	GetAllModuleResponse,
	ModuleFindByResponse,
	UpdateModuleRequest,
	UpdateModuleResponse
} from './dto'

@Injectable()
export class ModuleService {
	public constructor(private readonly moduleRepository: ModuleRepository) {}

	/**
	 * Найти все записи
	 *
	 * @returns Массив записей
	 */
	public async getAll(): Promise<GetAllModuleResponse> {
		const modules = await this.moduleRepository.getAll()

		return {
			data: {
				status: modules.length ? 'OK' : 'NOT_FOUND',
				modules
			}
		}
	}

	/**
	 * Найти по Уникальному идентификатору
	 *
	 * @param id Уникальный идентификатор
	 * @returns Найденый объект или Null
	 */
	public async findById(id: string): Promise<ModuleFindByResponse> {
		const module = await this.moduleRepository.findById(id)

		return {
			data: {
				status: module ? 'OK' : 'NOT_FOUND',
				module
			}
		}
	}

	/**
	 * Найти по коду модуля
	 *
	 * @param code Код модуля
	 * @returns Найденый объект или Null
	 */
	public async findByCode(code: string): Promise<ModuleFindByResponse> {
		const module = await this.moduleRepository.findByCode(code)

		return {
			data: {
				status: module ? 'OK' : 'NOT_FOUND',
				module
			}
		}
	}

	/**
	 * Найти по наименованию модуля
	 *
	 * @param name Наименование модуля
	 * @returns Найденый объект или Null
	 */
	public async findByName(name: string): Promise<ModuleFindByResponse> {
		const module = await this.moduleRepository.findByName(name)

		return {
			data: {
				status: module ? 'OK' : 'NOT_FOUND',
				module
			}
		}
	}

	/**
	 * Создание новой записи
	 *
	 * @param dto Данные для создания
	 * @returns Данные ответа со статусов выполнения операции и объектом модуля или Null
	 *
	 * @throws Ошибка входных данных от пользователя или ошибка создания записи
	 */
	public async create(
		dto: CreateModuleRequest
	): Promise<CreateModuleResponse> {
		const { name, code } = dto

		const isNameExist = await this.moduleRepository.findByName(name)
		if (isNameExist)
			throw new BadRequestException(
				`Модуль с наименованием "${name}" уже существует`
			)

		const isCodeExist = await this.moduleRepository.findByCode(code)
		if (isCodeExist)
			throw new BadRequestException(
				`Модуль с кодом "${code}" уже существует`
			)

		const module = await this.moduleRepository.create({ ...dto })
		if (!module)
			return {
				data: {
					status: 'ERROR',
					module
				}
			}

		return {
			data: {
				status: 'OK',
				module
			}
		}
	}

	/**
	 * Обновление записи модуля
	 *
	 * @param id Уникальный идентификатор модуля
	 * @param dto Данные для обновления
	 * @returns Данные ответа со статусом выполнения операции и объектом модуля или Null
	 *
	 * @throws Ошибка входных данных от пользователя или ошибка обновления записи
	 */
	public async update(
		id: string,
		dto: UpdateModuleRequest
	): Promise<UpdateModuleResponse> {
		const { name, code } = dto

		// Проверка существования модуля по id
		const isModuleExist = await this.moduleRepository.findById(id)
		if (!isModuleExist)
			throw new NotFoundException('Модуль для обновления не найден')

		// Проверка уникальности кода (исключая текущую запись)
		const isCodeExist = await this.moduleRepository.findByCode(code)
		if (isCodeExist && isCodeExist.id !== id) {
			throw new BadRequestException(
				`Модуль с кодом "${code}" уже существует`
			)
		}

		// Проверка уникальности названия (исключая текущую запись)
		const isNameExist = await this.moduleRepository.findByName(name)
		if (isNameExist && isNameExist.id !== id) {
			throw new BadRequestException(
				`Модуль с наименованием "${name}" уже существует`
			)
		}

		const module = await this.moduleRepository.update(id, { ...dto })
		if (!module) {
			return {
				data: {
					status: 'ERROR',
					module
				}
			}
		}

		return {
			data: {
				status: 'OK',
				module
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
	public async delete(id: string): Promise<DeleteModuleResponse> {
		const isModuleExist = await this.moduleRepository.findById(id)
		if (!isModuleExist)
			throw new NotFoundException('Модуль для удаления не найден')

		const status = await this.moduleRepository.delete(id)

		return {
			data: {
				status: status ? 'OK' : 'ERROR'
			}
		}
	}
}
