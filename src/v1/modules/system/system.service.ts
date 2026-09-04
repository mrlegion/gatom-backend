import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'

import { SystemRepository } from '../../../repositories/system/system.repository'

import {
	CreateSystemRequest,
	CreateSystemResponse,
	DeleteSystemResponse,
	GetAllSystemResponse,
	SystemFindByManyResponse,
	SystemFindByResponse,
	UpdateSystemRequest,
	UpdateSystemResponse
} from './dto'

@Injectable()
export class SystemService {
	public constructor(private readonly systemRepository: SystemRepository) {}

	/**
	 * Найти все записи
	 *
	 * @returns Массив записей
	 */
	public async getAll(): Promise<GetAllSystemResponse> {
		const systems = await this.systemRepository.getAll()
		console.log(systems)
		return {
			data: {
				status: systems.length ? 'OK' : 'NOT_FOUND',
				systems
			}
		}
	}

	/**
	 * Найти по Уникальному идентификатору
	 *
	 * @param id Уникальный идентификатор
	 * @returns Найденый объект или Null
	 */
	public async findById(id: string): Promise<SystemFindByResponse> {
		const system = await this.systemRepository.findById(id)

		return {
			data: {
				status: system ? 'OK' : 'NOT_FOUND',
				system
			}
		}
	}

	/**
	 * Найти по коду системы
	 *
	 * @param code Код системы
	 * @returns Найденый объект или Null
	 */
	public async findByCode(code: string): Promise<SystemFindByResponse> {
		const system = await this.systemRepository.findByCode(code)

		return {
			data: {
				status: system ? 'OK' : 'NOT_FOUND',
				system
			}
		}
	}

	/**
	 * Найти по наименованию системы
	 *
	 * @param name Наименование системы
	 * @returns Найденый объект или Null
	 */
	public async findByName(name: string): Promise<SystemFindByResponse> {
		const system = await this.systemRepository.findByName(name)

		return {
			data: {
				status: system ? 'OK' : 'NOT_FOUND',
				system
			}
		}
	}

	/**
	 * Найти по префиксу системы
	 *
	 * @param prefix Префикс системы
	 * @returns Массив найденых объектов или пустой массив, если данных нет
	 */
	public async findByPrefix(
		prefix: string
	): Promise<SystemFindByManyResponse> {
		const systems = await this.systemRepository.findByPrefix(prefix)

		return {
			data: {
				status: systems.length ? 'OK' : 'NOT_FOUND',
				systems
			}
		}
	}

	/**
	 * Создание новой записи
	 *
	 * @param dto Данные для создания
	 * @returns Данные ответа со статусов выполнения операции и объектом системы или Null
	 *
	 * @throws Ошибка входных данных от пользователя или ошибка создания записи
	 */
	public async create(
		dto: CreateSystemRequest
	): Promise<CreateSystemResponse> {
		const { name, code, prefix } = dto

		const isNameExist = await this.systemRepository.findByName(name)
		if (isNameExist)
			throw new BadRequestException(
				`Система с наименованием "${name}" уже существует`
			)

		const isCodeExist = await this.systemRepository.findByCode(code)
		if (isCodeExist)
			throw new BadRequestException(
				`Система с кодом "${code}" уже существует`
			)

		const system = await this.systemRepository.create({ ...dto })
		if (!system)
			return {
				data: {
					status: 'ERROR',
					system
				}
			}

		return {
			data: {
				status: 'OK',
				system
			}
		}
	}

	/**
	 * Обновление записи системы
	 *
	 * @param id Уникальный идентификатор системы
	 * @param dto Данные для обновления
	 * @returns Данные ответа со статусом выполнения операции и объектом системы или Null
	 *
	 * @throws Ошибка входных данных от пользователя или ошибка обновления записи
	 */
	public async update(
		id: string,
		dto: UpdateSystemRequest
	): Promise<UpdateSystemResponse> {
		const { name, code, prefix } = dto

		// Проверка существования системы по id
		const isSystemExist = await this.systemRepository.findById(id)
		if (!isSystemExist)
			throw new NotFoundException('Система для обновления не найдена')

		// Проверка уникальности кода (исключая текущую запись)
		const isCodeExist = await this.systemRepository.findByCode(code)
		if (isCodeExist && isCodeExist.id !== id) {
			throw new BadRequestException(
				`Система с кодом "${code}" уже существует`
			)
		}

		// Проверка уникальности названия (исключая текущую запись)
		const isNameExist = await this.systemRepository.findByName(name)
		if (isNameExist && isNameExist.id !== id) {
			throw new BadRequestException(
				`Система с наименованием "${name}" уже существует`
			)
		}

		const system = await this.systemRepository.update(id, { ...dto })
		if (!system) {
			return {
				data: {
					status: 'ERROR',
					system
				}
			}
		}

		return {
			data: {
				status: 'OK',
				system
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
	public async delete(id: string): Promise<DeleteSystemResponse> {
		const isSystemExist = await this.systemRepository.findById(id)
		if (!isSystemExist)
			throw new NotFoundException('Система для удаления не найдена')

		const status = await this.systemRepository.delete(id)

		return {
			data: {
				status: status ? 'OK' : 'ERROR'
			}
		}
	}
}
