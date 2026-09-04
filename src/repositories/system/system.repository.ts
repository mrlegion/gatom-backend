import { Injectable, Logger } from '@nestjs/common'

import { System } from '../../../prisma/generated/client'
import {
	SystemCreateInput,
	SystemUpdateInput
} from '../../../prisma/generated/models/System'
import { prisma } from '../../../prisma/prisma-client'
import { PrismaService } from '../../services'

@Injectable()
export class SystemRepository {
	private readonly _log: Logger

	public constructor(private readonly prisma: PrismaService) {
		this._log = new Logger(SystemRepository.name)
	}

	/**
	 * Получить все записи систем
	 *
	 * @returns - Массив систем
	 */
	public async getAll(): Promise<System[]> {
		try {
			return await this.prisma.system.findMany()
		} catch (e) {
			this._log.error(`METHOD [getAll]: ${e.message}`)
			console.log(e)
			return []
		}
	}

	/**
	 * Найти систему по уникальному идентификатору
	 *
	 * @param id - Уникальный идентификатор системы
	 * @returns - Найденый объект системы или Null
	 */
	public async findById(id: string): Promise<System | null> {
		return await this.prisma.system.findUnique({
			where: { id }
		})
	}

	/**
	 * Найти систему по коду системы
	 *
	 * @param code - Код системы
	 * @returns - Найденый объект системы или Null
	 */
	public async findByCode(code: string): Promise<System | null> {
		return await this.prisma.system.findUnique({
			where: { code }
		})
	}

	/**
	 * Найти систему по наименованию
	 *
	 * @param name - Наименование системы
	 * @returns - Найденый объект системы или Null
	 */
	public async findByName(name: string): Promise<System | null> {
		return await this.prisma.system.findUnique({
			where: { name }
		})
	}

	/**
	 * Найти систему по префиксу
	 *
	 * @param prefix - Префикс системы
	 * @returns - Массив объектов системы или Null
	 */
	public async findByPrefix(prefix: string): Promise<System[]> {
		try {
			return await this.prisma.system.findMany({
				where: { prefix }
			})
		} catch {
			return []
		}
	}

	/**
	 * Создание новой записи системы
	 *
	 * @param data - Данные для создания системы
	 * @returns - Созданный объект системы
	 */
	public async create(data: SystemCreateInput): Promise<System> {
		return await this.prisma.system.create({ data })
	}

	/**
	 * Обновление данных системы
	 *
	 * @param id - Уникальный идентификатор системы
	 * @param data - Данные для обновления системы
	 * @returns - Обновленный объект системы
	 */
	public async update(id: string, data: SystemUpdateInput): Promise<System> {
		return await this.prisma.system.update({
			where: { id },
			data
		})
	}

	/**
	 * Удаление системы
	 *
	 * @param id - Уникальный идентификатор системы
	 * @returns - Булевое значение выполнение операции удаления
	 */
	public async delete(id: string): Promise<boolean> {
		try {
			await this.prisma.system.delete({ where: { id } })
			return true
		} catch {
			return false
		}
	}
}
