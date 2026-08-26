import { Injectable } from '@nestjs/common'

import { Subsidiary } from '../../../prisma/generated/client'
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
	public findAll(): Promise<Subsidiary[]> {
		return this.prisma.subsidiary.findMany()
	}

	/**
	 * Найти организацию по уникальному коду
	 *
	 * @param id - Уникальный код филиала
	 *
	 * @returns Объект филиала
	 */
	public async findById(id: string): Promise<Subsidiary | null> {
		return this.prisma.subsidiary.findUnique({
			where: { id }
		})
	}

	/**
	 * Найти филиал по наименованию
	 *
	 * @param title - Наименование филиала
	 *
	 * @returns Объект филиала
	 */
	public async findByTitle(title: string): Promise<Subsidiary | null> {
		return this.prisma.subsidiary.findUnique({
			where: { title }
		})
	}

	/**
	 * Найти все филиалы организации
	 *
	 * @param organizationId - Уникальный код организации
	 *
	 * @returns Массив объектов филиалов
	 */
	public async findByOrganization(
		organizationId: string
	): Promise<Subsidiary[] | null> {
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
	 * @returns Объект созданной записи филиала
	 */
	public async create(data: SubsidiaryCreateInput): Promise<Subsidiary> {
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
	public async update(
		id: string,
		data: SubsidiaryUpdateInput
	): Promise<Subsidiary> {
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
	public async delete(id: string): Promise<Subsidiary> {
		return this.prisma.subsidiary.delete({ where: { id } })
	}
}
