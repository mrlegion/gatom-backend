import {
	BadRequestException,
	Body,
	Injectable,
	NotFoundException,
	Param
} from '@nestjs/common'

import { OrganizationRepository } from '../../../repositories'
import { omit } from '../../../shared/utils'

import {
	CreateOrganizationRequest,
	CreateOrganizationResponse,
	DeleteOrganizationResponse,
	GetByIdsRequest,
	GetOrganizationResponse,
	UpdateOrganizationRequest,
	UpdateOrganizationResponse
} from './dto'

@Injectable()
export class OrganizationService {
	public constructor(
		private readonly organizationRepository: OrganizationRepository
	) {}

	/**
	 * Получить все записи Организации
	 *
	 * @returns Массив записей Организаций
	 */
	public async getAll() {
		const organizations = await this.organizationRepository.findAll()
		if (!organizations) return { data: null }
		return {
			data: organizations
		}
	}

	/**
	 * Найти запись Организации по ID
	 *
	 * @param organizationId - Уникальный код организации
	 *
	 * @returns Объект записи Организации
	 */
	public async findById(organizationId: string) {
		const data = await this.organizationRepository.findById(organizationId)
		return { data }
	}

	/**
	 * Найти запись Организации по Наименованию
	 *
	 * @param title - Наименование организации
	 *
	 * @returns Объект записи Организации
	 */
	public async findByTitle(title: string): Promise<GetOrganizationResponse> {
		try {
			const organization =
				await this.organizationRepository.findByTitle(title)
			return { data: organization }
		} catch {
			return { data: null }
		}
	}

	/**
	 * Найти список Организаций по списку уникальных номеров
	 *
	 * @param data - Список уникальных номеров
	 *
	 * @returns Массив объектов Организаций
	 */
	public async getByIds(data: GetByIdsRequest) {
		const { id } = data
		const organizations = await this.organizationRepository.findByIds(id)

		return {
			data: organizations.map(o => omit(o, ['createdAt', 'updatedAt']))
		}
	}

	/**
	 * Создание новой записи Организации
	 *
	 * @param data - Данные для создания записи
	 *
	 * @returns - Объект созданный по переданным данным
	 */
	public async create(
		data: CreateOrganizationRequest
	): Promise<CreateOrganizationResponse> {
		const { title } = data
		const isExist = await this.organizationRepository.findByTitle(title)
		if (isExist)
			throw new BadRequestException(
				`Организация с наименованием: ${title} уже существует`
			)

		try {
			const organization = await this.organizationRepository.create({
				...data
			})

			return {
				data: organization
			}
		} catch {
			return {
				data: null
			}
		}
	}

	/**
	 * Обновление элемента организации
	 *
	 * @param organizationId - Уникальный код Организации
	 * @param data - Данные для обновления
	 *
	 * @returns - Обновленный объект Организации
	 */
	public async update(
		organizationId: string,
		data: UpdateOrganizationRequest
	): Promise<UpdateOrganizationResponse> {
		const isExist =
			await this.organizationRepository.findById(organizationId)
		if (!isExist)
			throw new NotFoundException('Организация для обновления не найдена')

		try {
			const organization = await this.organizationRepository.update(
				organizationId,
				data
			)

			return {
				data: omit(organization, ['updatedAt', 'createdAt']),
				success: true
			}
		} catch {
			return {
				data: null,
				success: false
			}
		}
	}

	/**
	 * Удаление элемента Организации
	 *
	 * @param organizationId - Уникальный номер Организации
	 *
	 * @returns Статус выполнения операции
	 */
	public async delete(
		@Param('id') organizationId: string
	): Promise<DeleteOrganizationResponse> {
		try {
			await this.organizationRepository.delete(organizationId)
		} catch {
			return { data: false }
		}

		return { data: true }
	}
}
