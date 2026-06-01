import { Injectable } from '@nestjs/common'

import {
	OrganizationCreateInput,
	OrganizationUpdateInput
} from '../../../prisma/generated/models/Organization'
import { PrismaService } from '../../services'

@Injectable()
export class OrganizationRepository {
	public constructor(private readonly prisma: PrismaService) {}

	/**
	 * Получить все записи организаций
	 *
	 * @returns Массив записей организаций
	 */
	public async findAll() {
		return this.prisma.organization.findMany({
			include: { subsidiaries: true }
		})
	}

	/**
	 * Найти запись по уникальному идентификатору Организации
	 *
	 * @param id - Уникальный идентификатор записи
	 * @param withSubsidiaries - Включить в выборку записи Филиалов
	 *
	 * @returns Объект организации
	 */
	public async findById(id: string, withSubsidiaries: boolean = false) {
		return this.prisma.organization.findUnique({
			where: { id },
			include: { subsidiaries: withSubsidiaries }
		})
	}

	/**
	 * Найти запись организации по филиалу
	 * @param subsidiaryId - Уникальный код филиала
	 *
	 * @returns Объект организации
	 */
	public async findBySubsidiary(subsidiaryId: string) {
		return this.prisma.organization.findFirst({
			where: {
				subsidiaries: {
					some: {
						id: subsidiaryId
					}
				}
			}
		})
	}

	/**
	 * Создание записи организации
	 *
	 * @param data - Данные для создания организации
	 *
	 * @returns Объект созданной записи организации
	 */
	public async create(data: OrganizationCreateInput) {
		return this.prisma.organization.create({ data })
	}

	/**
	 * Обновление записи организации
	 *
	 * @param id - Уникальный код Организации
	 * @param data - Данные для обновления
	 *
	 * @returns Обновленный объект организации
	 */
	public async update(id: string, data: OrganizationUpdateInput) {
		return this.prisma.organization.update({
			where: { id },
			data
		})
	}

	/**
	 * Удаление записи организации
	 *
	 * @param id - Уникальный номер организации
	 *
	 * @returns Удаленная запись организации
	 */
	public async delete(id: string) {
		return this.prisma.organization.delete({ where: { id } })
	}
}
