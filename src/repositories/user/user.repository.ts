import { Injectable, Logger } from '@nestjs/common'
import { Prisma } from '@prisma/client/extension'

import { User } from '../../../prisma/generated/client'
import {
	UserCreateInput,
	UserSelect,
	UserUpdateInput
} from '../../../prisma/generated/models/User'
import { PrismaService } from '../../services'

import Result = Prisma.Result

/**
 * Репозиторий для управления данными пользователя
 */
@Injectable()
export class UserRepository {
	private readonly _logger: Logger

	public constructor(private readonly prisma: PrismaService) {
		this._logger = new Logger(UserRepository.name)
	}

	/**
	 * Находит пользователя по уникальному идентификатору.
	 *
	 * @param id - Уникальный идентификатор пользователя (UUID или строка)
	 *
	 * @returns Возвращает объект пользователя, если найден, иначе `null`
	 */
	public async findById(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
			include: {
				employee: true
			}
		})
	}

	/**
	 * Найти пользователя по электронной почте
	 *
	 * @param email - Электронная почта пользователя
	 *
	 * @returns Возвращает объект пользователя, если найден, иначе `null`
	 */
	public async findByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: { email },
			include: {
				employee: true
			}
		})
	}

	/**
	 * Создание нового пользователя
	 *
	 * @param data - Данные для создания пользователя
	 *
	 * @returns Возвращает объект пользователя, иначе `null`
	 */
	public async create(data: UserCreateInput): Promise<User | null> {
		return this.prisma.user.create({
			data
		})
	}

	/**
	 * Обновление данных пользователя
	 *
	 * @param id - Уникальный номер пользователя
	 * @param data - Данные для создания пользователя
	 * @param select - Объект, определяющий, какие поля пользователя следует выбрать (опционально)
	 *
	 * @returns Возвращает объект пользователя, иначе `null`
	 */
	public async update(
		id: string,
		data: UserUpdateInput,
		select?: UserSelect
	) {
		return this.prisma.user.update({
			where: { id },
			data,
			select
		})
	}

	/**
	 * Удаление пользователя
	 *
	 * @param id - Уникальный номер пользователя
	 *
	 * @returns Возвращает объект пользователя, иначе `null`
	 */
	public async delete(id: string) {
		return this.prisma.user.delete({
			where: { id }
		})
	}
}
