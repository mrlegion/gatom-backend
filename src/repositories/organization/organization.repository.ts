import { Injectable } from '@nestjs/common'

import { Organization } from '../../../prisma/generated/client'
import {
	OrganizationCreateInput,
	OrganizationUpdateInput
} from '../../../prisma/generated/models/Organization'
import { PrismaService } from '../../services'

@Injectable()
export class OrganizationRepository {
	public constructor(private readonly prisma: PrismaService) {}

	private readonly _subsidiaries = {
		select: {
			id: true,
			title: true,
			address: true,
			phones: true,
			emails: true
		}
	}

	/**
	 * Получить все записи организаций
	 *
	 * @param withSubsidiaries - включить в запрос филиалы
	 *
	 * @returns Массив записей организаций
	 */
	public async findAll(withSubsidiaries: boolean = true) {
		return this.prisma.organization.findMany({
			include: {
				subsidiaries: withSubsidiaries ? this._subsidiaries : false
			}
		})
	}

	/**
	 * Выбрать организации по списку ID
	 *
	 * @param ids - Массив уникальных номеров
	 *
	 * @returns Массив записей организаций
	 */
	public async findByIds(ids: string[]) {
		return this.prisma.organization.findMany({
			where: {
				id: {
					in: ids
				}
			}
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
			include: {
				subsidiaries: withSubsidiaries ? this._subsidiaries : false
			}
		})
	}

	/**
	 * Найти Организацию по наименованию
	 *
	 * @param title - Наименование Организации
	 * @param withSubsidiaries - Включить в запрос Филиалы
	 *
	 * @returns Найденый объект записи или Null
	 */
	public async findByTitle(title: string, withSubsidiaries: boolean = true) {
		return this.prisma.organization.findUnique({
			where: { title },
			include: {
				subsidiaries: withSubsidiaries ? this._subsidiaries : false
			}
		})
	}

	/**
	 * Найти запись организации по филиалу
	 *
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
	public async create(data: OrganizationCreateInput): Promise<Organization> {
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
	public async update(
		id: string,
		data: OrganizationUpdateInput
	): Promise<Organization> {
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
