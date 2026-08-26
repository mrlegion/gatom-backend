import { th } from '@faker-js/faker'
import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { create } from 'node:domain'

import {
	OrganizationRepository,
	SubsidiaryRepository
} from '../../../repositories'
import { omit, pick } from '../../../shared/utils'

import { CreateSubsidiaryRequest, UpdateSubsidiaryRequest } from './dto/request'
import {
	CreateSubsidiaryResponse,
	FindByResponse,
	GetAllSubsidiaryResponse
} from './dto/response'

@Injectable()
export class SubsidiaryService {
	public constructor(
		private readonly subsidiaryRepository: SubsidiaryRepository,
		private readonly organizationRepository: OrganizationRepository
	) {}

	/**
	 * Получение всех записей Филиалов
	 *
	 * @returns Массив объектов Филиала
	 */
	public async getAll(): Promise<GetAllSubsidiaryResponse> {
		const subsidiaries = await this.subsidiaryRepository.findAll()

		return {
			data: subsidiaries.map(i => omit(i, ['createdAt', 'updatedAt']))
		}
	}

	/**
	 * Найти запись по ID
	 *
	 * @param id - Уникальный номер Филиала
	 *
	 * @returns Объект Филиала
	 */
	public async findById(id: string) {
		const subsidiary = await this.subsidiaryRepository.findById(id)

		return {
			data: subsidiary
				? omit(subsidiary, ['createdAt', 'updatedAt'])
				: null
		}
	}

	/**
	 * Найти по Наименованию
	 *
	 * @param title - Наименование Филиала
	 *
	 * @returns Объект Филиала
	 */
	public async findByTitle(title: string): Promise<FindByResponse> {
		const subsidiary = await this.subsidiaryRepository.findByTitle(title)

		return {
			data: subsidiary
				? omit(subsidiary, ['createdAt', 'updatedAt'])
				: null
		}
	}

	/**
	 * Найти Филиалы по Организации
	 *
	 * @param organizationId - Уникальный номер Организации
	 *
	 * @returns Массив Филиалов
	 */
	public async findByOrganization(
		organizationId: string
	): Promise<FindByResponse> {
		const subsidiaries =
			await this.subsidiaryRepository.findByOrganization(organizationId)
		if (!subsidiaries) return { data: null }

		return {
			data: subsidiaries.map(i => omit(i, ['createdAt', 'updatedAt']))
		}
	}

	/**
	 * Создание новой записи Филиала
	 *
	 * @param data - Объект данных для создания
	 *
	 * @returns Новый объект Филиала
	 */
	public async create(
		data: CreateSubsidiaryRequest
	): Promise<CreateSubsidiaryResponse> {
		const { title, organizationId, emails, phones, address } = data

		const isTitleExits = await this.subsidiaryRepository.findByTitle(title)
		if (isTitleExits)
			throw new BadRequestException(
				`Наименование филиала "${title}" уже используется`
			)

		const organization =
			await this.organizationRepository.findById(organizationId)
		if (!organization) throw new NotFoundException('Организация не найдена')

		const subsidiary = await this.subsidiaryRepository.create({
			title,
			address,
			emails,
			phones,
			organization: { connect: { id: organization.id } }
		})

		return { data: omit(subsidiary, ['createdAt', 'updatedAt']) }
	}

	/**
	 * Обновление записи Филиала
	 *
	 * @param id - Уникальный номер Филиала
	 * @param data - Объект с данными для обновления
	 *
	 * @returns Обновленный объект Филиала
	 */
	public async update(id: string, data: UpdateSubsidiaryRequest) {
		const oldSubsidiary = await this.subsidiaryRepository.findById(id)
		if (!oldSubsidiary) throw new NotFoundException('Филиал не найден')

		const { title, address, emails, phones, organizationId } = data

		if (organizationId !== oldSubsidiary.organizationId) {
			const organization =
				await this.organizationRepository.findById(organizationId)
			if (!organization)
				throw new BadRequestException('Организация не найдена')
		}

		const subsidiary = await this.subsidiaryRepository.update(
			oldSubsidiary.id,
			{
				title,
				address,
				emails,
				phones,
				organization: {
					connect: { id: organizationId }
				}
			}
		)

		return { data: omit(subsidiary, ['updatedAt', 'createdAt']) }
	}

	/**
	 * Подключение Организации к филиалу
	 *
	 * @param id - Уникальный номер Филиала
	 * @param organizationId - Уникальный номер Организации
	 *
	 * @return Булевое значение выполнения операции
	 */
	public async connectToOrganization(id: string, organizationId: string) {
		const isSubsidiaryExist = await this.subsidiaryRepository.findById(id)
		if (!isSubsidiaryExist) throw new NotFoundException('Филиал не найден')

		const isOrganizationExist =
			await this.organizationRepository.findById(organizationId)
		if (!isOrganizationExist)
			throw new NotFoundException('Организация не найдена')

		await this.subsidiaryRepository.update(id, {
			organization: { connect: { id: organizationId } }
		})

		return { result: true }
	}

	/**
	 * Удаление записи Филиала
	 *
	 * @param id - Уникальный номер Филиала
	 *
	 * @return Булевое значение выполнения операции
	 */
	public async delete(id: string) {
		const isExist = await this.subsidiaryRepository.findById(id)
		if (!isExist) throw new NotFoundException('Филиал не найден')

		await this.subsidiaryRepository.delete(id)

		return { data: true }
	}
}
