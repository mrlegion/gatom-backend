import { Injectable } from '@nestjs/common'

import { UserPasswordHistory } from '../../../prisma/generated/client'
import { UserPasswordHistoryCreateInput } from '../../../prisma/generated/models/UserPasswordHistory'
import { PrismaService } from '../../services'

@Injectable()
export class PasswordHistoryRepository {
	public constructor(private readonly prisma: PrismaService) {}

	/**
	 * Найти все ранее используемые пароли пользователя
	 *
	 * @param userId - Уникальный идентификатор пользователя
	 * @param limit - Лимит выбранных записей
	 *
	 * @returns Массив данных используемых паролей пользователя или null
	 */
	public async findByUser(
		userId: string,
		limit?: number
	): Promise<UserPasswordHistory[] | null> {
		const queryOptions: Parameters<
			typeof this.prisma.userPasswordHistory.findMany
		>[0] = {
			where: { userId },
			orderBy: { createdAt: 'desc' }
		}

		if (limit !== undefined && limit > 0) {
			queryOptions.take = limit
		}

		return this.prisma.userPasswordHistory.findMany(queryOptions)
	}

	/**
	 * Найти последний используемый пароль пользователя
	 *
	 * @param userId - Уникальный идентификатор пользователя
	 *
	 * @returns Данные по используемому паролю или null
	 */
	public async findUserLastPassword(
		userId: string
	): Promise<UserPasswordHistory | null> {
		return this.prisma.userPasswordHistory.findFirst({
			where: { userId },
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	/**
	 * Создание записи в таблице
	 *
	 * @param data - Данные для записи со ссылкой на пользователя
	 *
	 * @returns Новая запись
	 */
	public async create(
		data: UserPasswordHistoryCreateInput
	): Promise<UserPasswordHistory | null> {
		return this.prisma.userPasswordHistory.create({
			data
		})
	}
}
