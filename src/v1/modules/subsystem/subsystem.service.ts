import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'

import { SubsystemRepository } from '../../../repositories/subsystem/subsystem.repository'

import type {
	CreateSubsystemRequest,
	CreateSubsystemResponse,
	DeleteSubsystemResponse,
	GetAllSubsystemResponse,
	SubsystemFindByManyResponse,
	SubsystemFindByResponse,
	UpdateSubsystemRequest,
	UpdateSubsystemResponse
} from './dto'

@Injectable()
export class SubsystemService {
	public constructor(
		private readonly subsystemRepository: SubsystemRepository
	) {}

	/**
	 * Найти все записи
	 *
	 * @returns Массив записей
	 */
	public async getAll(): Promise<GetAllSubsystemResponse> {
		const subsystems = await this.subsystemRepository.getAll()

		return {
			data: {
				status: subsystems.length ? 'OK' : 'NOT_FOUND',
				subsystems
			}
		}
	}

	/**
	 * Найти по Уникальному идентификатору
	 *
	 * @param id Уникальный идентификатор
	 * @returns Найденый объект или Null
	 */
	public async findById(id: string): Promise<SubsystemFindByResponse> {
		const subsystem = await this.subsystemRepository.findById(id)

		return {
			data: {
				status: subsystem ? 'OK' : 'NOT_FOUND',
				subsystem
			}
		}
	}

	/**
	 * Найти по коду подсистемы
	 *
	 * @param code Код подсистемы
	 * @returns Найденый объект или Null
	 */
	public async findByCode(code: string): Promise<SubsystemFindByResponse> {
		const subsystem = await this.subsystemRepository.findByCode(code)

		return {
			data: {
				status: subsystem ? 'OK' : 'NOT_FOUND',
				subsystem
			}
		}
	}

	/**
	 * Найти по наименованию подсистемы
	 *
	 * @param name Наименование подсистемы
	 * @returns Найденый объект или Null
	 */
	public async findByName(name: string): Promise<SubsystemFindByResponse> {
		const subsystem = await this.subsystemRepository.findByName(name)

		return {
			data: {
				status: subsystem ? 'OK' : 'NOT_FOUND',
				subsystem
			}
		}
	}

	/**
	 * Найти подсистемы по идентификатору родительской системы
	 *
	 * @param systemId Уникальный идентификатор системы
	 * @returns Массив найденых объектов или пустой массив, если данных нет
	 */
	public async findBySystemId(
		systemId: string
	): Promise<SubsystemFindByManyResponse> {
		const subsystems =
			await this.subsystemRepository.findBySystemId(systemId)

		return {
			data: {
				status: subsystems.length ? 'OK' : 'NOT_FOUND',
				subsystems
			}
		}
	}

	/**
	 * Создание новой записи
	 *
	 * @param dto Данные для создания
	 * @returns Данные ответа со статусов выполнения операции и объектом подсистемы или Null
	 *
	 * @throws Ошибка входных данных от пользователя или ошибка создания записи
	 */
	public async create(
		dto: CreateSubsystemRequest
	): Promise<CreateSubsystemResponse> {
		const { name, code, type, systemId, mandants } = dto

		const isNameExist = await this.subsystemRepository.findByName(name)
		if (isNameExist)
			throw new BadRequestException(
				`Подсистема с наименованием "${name}" уже существует`
			)

		const isCodeExist = await this.subsystemRepository.findByCode(code)
		if (isCodeExist)
			throw new BadRequestException(
				`Подсистема с кодом "${code}" уже существует`
			)

		const subsystem = await this.subsystemRepository.create({
			name,
			code,
			type,
			mandants,
			system: {
				connect: {
					id: systemId
				}
			}
		})
		if (!subsystem)
			return {
				data: {
					status: 'ERROR',
					subsystem
				}
			}

		return {
			data: {
				status: 'OK',
				subsystem
			}
		}
	}

	/**
	 * Обновление записи подсистемы
	 *
	 * @param id Уникальный идентификатор подсистемы
	 * @param dto Данные для обновления
	 * @returns Данные ответа со статусом выполнения операции и объектом подсистемы или Null
	 *
	 * @throws Ошибка входных данных от пользователя или ошибка обновления записи
	 */
	public async update(
		id: string,
		dto: UpdateSubsystemRequest
	): Promise<UpdateSubsystemResponse> {
		const { name, code } = dto

		const isSubsystemExist = await this.subsystemRepository.findById(id)
		if (!isSubsystemExist)
			throw new NotFoundException('Подсистема для обновления не найдена')

		const isCodeExist = await this.subsystemRepository.findByCode(code)
		if (isCodeExist && isCodeExist.id !== id) {
			throw new BadRequestException(
				`Подсистема с кодом "${code}" уже существует`
			)
		}

		const isNameExist = await this.subsystemRepository.findByName(name)
		if (isNameExist && isNameExist.id !== id) {
			throw new BadRequestException(
				`Подсистема с наименованием "${name}" уже существует`
			)
		}

		const subsystem = await this.subsystemRepository.update(id, { ...dto })
		if (!subsystem) {
			return {
				data: {
					status: 'ERROR',
					subsystem
				}
			}
		}

		return {
			data: {
				status: 'OK',
				subsystem
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
	public async delete(id: string): Promise<DeleteSubsystemResponse> {
		const isSubsystemExist = await this.subsystemRepository.findById(id)
		if (!isSubsystemExist)
			throw new NotFoundException('Подсистема для удаления не найдена')

		const status = await this.subsystemRepository.delete(id)

		return {
			data: {
				status: status ? 'OK' : 'ERROR'
			}
		}
	}
}
