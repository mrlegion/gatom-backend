import { Injectable } from '@nestjs/common'

import { EmployeeCreateInput } from '../../../prisma/generated/models/Employee'
import { PrismaService } from '../../services'

@Injectable()
export class EmployeeRepository {
	public constructor(private readonly prisma: PrismaService) {}

	/**
	 * Найти сотрудника по имени пользователю
	 *
	 * @param username - Имя пользователя сотрудника
	 *
	 * @returns Запись сотрудника с данными пользователя
	 */
	public async findByUsername(username: string) {
		return this.prisma.employee.findUnique({
			where: { username },
			include: {
				user: true
			}
		})
	}

	/**
	 * Создание новой записи сотрудника
	 *
	 * @param data - Данные для создания записи
	 *
	 * @returns Запись сотрудника с данными пользователя
	 */
	public async create(data: EmployeeCreateInput) {
		return this.prisma.employee.create({
			data,
			include: {
				user: true
			}
		})
	}

	/**
	 * Удаление записи сотрудника
	 *
	 * @param id - Уникальный номер сотрудника
	 *
	 * @returns Удаленная запись сотрудника
	 */
	public async delete(id: string) {
		return this.prisma.employee.delete({ where: { id } })
	}
}
