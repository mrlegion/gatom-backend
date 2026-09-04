import { Injectable, Logger } from '@nestjs/common'

import { DevelopmentType } from '../../../prisma/generated/client'
import {
	DevelopmentTypeCreateInput,
	DevelopmentTypeUpdateInput
} from '../../../prisma/generated/models/DevelopmentType'
import { PrismaService } from '../../services'

@Injectable()
export class DevelopmentTypeRepository {
	private readonly _log: Logger

	public constructor(private readonly prisma: PrismaService) {
		this._log = new Logger(DevelopmentTypeRepository.name)
	}

	/**
	 * Получить все записи типов доработок
	 *
	 * @returns - Массив типов доработок
	 */
	public async getAll(): Promise<DevelopmentType[]> {
		try {
			return await this.prisma.developmentType.findMany()
		} catch (e) {
			this._log.error(`METHOD [getAll]: ${e.message}`)
			return []
		}
	}

	/**
	 * Найти тип доработки по уникальному идентификатору
	 *
	 * @param id - Уникальный идентификатор типа доработки
	 * @returns - Найденый объект типа доработки или Null
	 */
	public async findById(id: string): Promise<DevelopmentType | null> {
		return await this.prisma.developmentType.findUnique({
			where: { id }
		})
	}

	/**
	 * Найти тип доработки по коду
	 *
	 * @param code - Код типа доработки
	 * @returns - Найденый объект типа доработки или Null
	 */
	public async findByCode(code: string): Promise<DevelopmentType | null> {
		return await this.prisma.developmentType.findUnique({
			where: { code }
		})
	}

	/**
	 * Найти тип доработки по наименованию
	 *
	 * @param name - Наименование типа доработки
	 * @returns - Найденый объект типа доработки или Null
	 */
	public async findByName(name: string): Promise<DevelopmentType | null> {
		return await this.prisma.developmentType.findUnique({
			where: { name }
		})
	}

	/**
	 * Создание новой записи типа доработки
	 *
	 * @param data - Данные для создания типа доработки
	 * @returns - Созданный объект типа доработки
	 */
	public async create(
		data: DevelopmentTypeCreateInput
	): Promise<DevelopmentType> {
		return await this.prisma.developmentType.create({ data })
	}

	/**
	 * Обновление данных типа доработки
	 *
	 * @param id - Уникальный идентификатор типа доработки
	 * @param data - Данные для обновления типа доработки
	 * @returns - Обновленный объект типа доработки
	 */
	public async update(
		id: string,
		data: DevelopmentTypeUpdateInput
	): Promise<DevelopmentType> {
		return await this.prisma.developmentType.update({
			where: { id },
			data
		})
	}

	/**
	 * Удаление типа доработки
	 *
	 * @param id - Уникальный идентификатор типа доработки
	 * @returns - Булевое значение выполнение операции удаления
	 */
	public async delete(id: string): Promise<boolean> {
		try {
			await this.prisma.developmentType.delete({ where: { id } })
			return true
		} catch {
			return false
		}
	}
}
