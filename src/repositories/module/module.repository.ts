import { Injectable, Logger } from '@nestjs/common'

import { Module as ModuleModel } from '../../../prisma/generated/client'
import {
	ModuleCreateInput,
	ModuleUpdateInput
} from '../../../prisma/generated/models/Module'
import { PrismaService } from '../../services'

@Injectable()
export class ModuleRepository {
	private readonly _log: Logger

	public constructor(private readonly prisma: PrismaService) {
		this._log = new Logger(ModuleRepository.name)
	}

	/**
	 * Получить все записи модулей
	 *
	 * @returns - Массив модулей
	 */
	public async getAll(): Promise<ModuleModel[]> {
		try {
			return await this.prisma.module.findMany()
		} catch (e) {
			this._log.error(`METHOD [getAll]: ${e.message}`)
			return []
		}
	}

	/**
	 * Найти модуль по уникальному идентификатору
	 *
	 * @param id - Уникальный идентификатор модуля
	 * @returns - Найденый объект модуля или Null
	 */
	public async findById(id: string): Promise<ModuleModel | null> {
		return await this.prisma.module.findUnique({
			where: { id }
		})
	}

	/**
	 * Найти модуль по коду
	 *
	 * @param code - Код модуля
	 * @returns - Найденый объект модуля или Null
	 */
	public async findByCode(code: string): Promise<ModuleModel | null> {
		return await this.prisma.module.findUnique({
			where: { code }
		})
	}

	/**
	 * Найти модуль по наименованию
	 *
	 * @param name - Наименование модуля
	 * @returns - Найденый объект модуля или Null
	 */
	public async findByName(name: string): Promise<ModuleModel | null> {
		return await this.prisma.module.findUnique({
			where: { name }
		})
	}

	/**
	 * Создание новой записи модуля
	 *
	 * @param data - Данные для создания модуля
	 * @returns - Созданный объект модуля
	 */
	public async create(data: ModuleCreateInput): Promise<ModuleModel> {
		return await this.prisma.module.create({ data })
	}

	/**
	 * Обновление данных модуля
	 *
	 * @param id - Уникальный идентификатор модуля
	 * @param data - Данные для обновления модуля
	 * @returns - Обновленный объект модуля
	 */
	public async update(
		id: string,
		data: ModuleUpdateInput
	): Promise<ModuleModel> {
		return await this.prisma.module.update({
			where: { id },
			data
		})
	}

	/**
	 * Удаление модуля
	 *
	 * @param id - Уникальный идентификатор модуля
	 * @returns - Булевое значение выполнение операции удаления
	 */
	public async delete(id: string): Promise<boolean> {
		try {
			await this.prisma.module.delete({ where: { id } })
			return true
		} catch {
			return false
		}
	}
}
