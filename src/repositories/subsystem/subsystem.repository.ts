import { Injectable, Logger } from '@nestjs/common'

import { Subsystem } from '../../../prisma/generated/client'
import {
	SubsystemCreateInput,
	SubsystemUpdateInput
} from '../../../prisma/generated/models/Subsystem'
import { PrismaService } from '../../services'

@Injectable()
export class SubsystemRepository {
	private readonly _log: Logger

	public constructor(private readonly prisma: PrismaService) {
		this._log = new Logger(SubsystemRepository.name)
	}

	/**
	 * Получить все записи подсистем
	 *
	 * @returns - Массив подсистем
	 */
	public async getAll(): Promise<Subsystem[]> {
		try {
			return await this.prisma.subsystem.findMany()
		} catch (e) {
			this._log.error(`METHOD [getAll]: ${e.message}`)
			return []
		}
	}

	/**
	 * Найти подсистему по уникальному идентификатору
	 *
	 * @param id - Уникальный идентификатор подсистемы
	 * @returns - Найденый объект подсистемы или Null
	 */
	public async findById(id: string): Promise<Subsystem | null> {
		return await this.prisma.subsystem.findUnique({
			where: { id }
		})
	}

	/**
	 * Найти подсистему по коду
	 *
	 * @param code - Код подсистемы
	 * @returns - Найденый объект подсистемы или Null
	 */
	public async findByCode(code: string): Promise<Subsystem | null> {
		return await this.prisma.subsystem.findUnique({
			where: { code }
		})
	}

	/**
	 * Найти подсистему по наименованию
	 *
	 * @param name - Наименование подсистемы
	 * @returns - Найденый объект подсистемы или Null
	 */
	public async findByName(name: string): Promise<Subsystem | null> {
		return await this.prisma.subsystem.findUnique({
			where: { name }
		})
	}

	/**
	 * Найти подсистемы по идентификатору родительской системы
	 *
	 * @param systemId - Уникальный идентификатор системы
	 * @returns - Массив объектов подсистем или пустой массив, если данных нет
	 */
	public async findBySystemId(systemId: string): Promise<Subsystem[]> {
		try {
			return await this.prisma.subsystem.findMany({
				where: { systemId }
			})
		} catch {
			return []
		}
	}

	/**
	 * Создание новой записи подсистемы
	 *
	 * @param data - Данные для создания подсистемы
	 * @returns - Созданный объект подсистемы
	 */
	public async create(data: SubsystemCreateInput): Promise<Subsystem> {
		return await this.prisma.subsystem.create({ data })
	}

	/**
	 * Обновление данных подсистемы
	 *
	 * @param id - Уникальный идентификатор подсистемы
	 * @param data - Данные для обновления подсистемы
	 * @returns - Обновленный объект подсистемы
	 */
	public async update(
		id: string,
		data: SubsystemUpdateInput
	): Promise<Subsystem> {
		return await this.prisma.subsystem.update({
			where: { id },
			data
		})
	}

	/**
	 * Удаление подсистемы
	 *
	 * @param id - Уникальный идентификатор подсистемы
	 * @returns - Булевое значение выполнение операции удаления
	 */
	public async delete(id: string): Promise<boolean> {
		try {
			await this.prisma.subsystem.delete({ where: { id } })
			return true
		} catch {
			return false
		}
	}
}
