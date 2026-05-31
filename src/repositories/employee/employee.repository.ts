import { Injectable } from '@nestjs/common'

import { EmployeeCreateInput } from '../../../prisma/generated/models/Employee'
import { PrismaService } from '../../services'

@Injectable()
export class EmployeeRepository {
	public constructor(private readonly prisma: PrismaService) {}

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
