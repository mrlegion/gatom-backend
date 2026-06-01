import { Injectable } from '@nestjs/common'

import {
	SubsidiaryCreateInput,
	SubsidiaryUpdateInput
} from '../../../prisma/generated/models/Subsidiary'
import { PrismaService } from '../../services'

@Injectable()
export class SubsidiaryRepository {
	public constructor(private readonly prisma: PrismaService) {}

	/**
	 * Получить все записи филиалов
	 *
	 * @returns Массив объектов филиалов
	 */
	public findAll() {
		return this.prisma.subsidiary.findMany()
	}

	/**
	 * Найти организацию по уникальному коду
	 *
	 * @param id - Уникальный код филиала
	 * @param withOrganization - Включить организацию в выборку
	 *
	 * @returns Объект филиала
	 */
	public async findById(id: string, withOrganization: boolean = false) {
		return this.prisma.subsidiary.findUnique({
			where: { id },
			include: { organization: withOrganization }
		})
	}

	/**
	 * Найти все филиалы организации
	 *
	 * @param organizationId - Уникальный код организации
	 *
	 * @returns Массив объектов филиалов
	 */
	public async findByOrganization(organizationId: string) {
		return this.prisma.subsidiary.findMany({
			where: {
				organizationId
			}
		})
	}

	/**
	 * Создание новой записи филиала
	 *
	 * @param data - Данные для создания записи
	 *
	 * @returns Объект созданой записи филиала
	 */
	public async create(data: SubsidiaryCreateInput) {
		return this.prisma.subsidiary.create({ data })
	}

	/**
	 * Обновление записи филиала
	 *
	 * @param id - Уникальный номер филиала
	 * @param data - Данные для обновления филиала
	 *
	 * @returns Обновленный объект записи филиала
	 */
	public async update(id: string, data: SubsidiaryUpdateInput) {
		return this.prisma.subsidiary.update({
			where: { id },
			data
		})
	}

	/**
	 * Удаление записи филиала
	 *
	 * @param id - Уникальный код филиала
	 *
	 * @returns Удаленный объект филиала
	 */
	public async delete(id: string) {
		return this.prisma.subsidiary.delete({ where: { id } })
	}
}
