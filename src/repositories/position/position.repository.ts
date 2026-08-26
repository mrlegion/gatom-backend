import { Injectable, NotFoundException } from '@nestjs/common'

import {
	PositionCreateInput,
	PositionUpdateInput
} from '../../../prisma/generated/models/Position'
import { PrismaService } from '../../services'

@Injectable()
export class PositionRepository {
	public constructor(private readonly prisma: PrismaService) {}

	/**
	 * Получить все активные записи должностей
	 *
	 * @param withNonActive - Включить не активные записи
	 *
	 * @returns Все активные записи должностей
	 */
	public async findAll(withNonActive: boolean = true) {
		if (withNonActive) {
			return this.prisma.position.findMany()
		}

		return this.prisma.position.findMany({
			where: { isNonActive: false }
		})
	}

	/**
	 * Найти должность по уникальному коду
	 *
	 * @param id - Уникальный код должности
	 *
	 * @returns Найденная запись
	 */
	public async findById(id: string) {
		return this.prisma.position.findUnique({
			where: { id }
		})
	}

	/**
	 * Найти должность по Наименованию
	 *
	 * @param title - Наименование должности
	 *
	 * @returns Найденная запись
	 */
	public async findByTitle(title: string) {
		return this.prisma.position.findUnique({
			where: { title }
		})
	}

	/**
	 * Создание новой записи должности
	 *
	 * @param data - Данные для создания записи должности
	 *
	 * @returns Объект, созданной должности
	 */
	public async create(data: PositionCreateInput) {
		return this.prisma.position.create({ data })
	}

	/**
	 * Обновление записи должности
	 *
	 * @param id - Уникальный номер должности
	 * @param data - Данные для обновления должности
	 *
	 * @returns Обновленная запись должности
	 */
	public async update(id: string, data: PositionUpdateInput) {
		return this.prisma.position.update({
			where: { id },
			data
		})
	}

	/**
	 * Переключение флага доступности должности
	 *
	 * @param id - Уникальный код должности
	 *
	 * @returns Объект, с измененными данными
	 */
	public async toggleActive(id: string) {
		const position = await this.prisma.position.findUnique({
			where: { id }
		})

		if (!position)
			throw new NotFoundException(
				`Должность с уникальным номером ${id} не найдена`
			)

		return this.prisma.position.update({
			where: { id },
			data: {
				isNonActive: !position.isNonActive
			}
		})
	}

	/**
	 * Удаление записи должности сотрудников
	 *
	 * @param id - Уникальный номер должности
	 *
	 * @returns Удаленная запись должности
	 */
	public async delete(id: string) {
		return this.prisma.position.delete({ where: { id } })
	}
}
