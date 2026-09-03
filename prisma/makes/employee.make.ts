import { NotFoundException } from '@nestjs/common'

import { Role } from '../generated/enums'
import { prisma } from '../prisma-client'

export async function makeEmployee() {
	const user = await prisma.user.findUnique({
		where: { email: 'admin@greenatom.ru' }
	})
	if (!user)
		throw new NotFoundException(
			'Пользователь с почтой admin@greenatom.ru не найден'
		)

	const position = await prisma.position.findUnique({
		where: { title: 'Ведущий специалист' }
	})
	if (!position)
		throw new NotFoundException('Должность Ведущий специалист не найдена')

	const subsidiary = await prisma.subsidiary.findUnique({
		where: { title: 'Филиал в г. Новоуральске' }
	})
	if (!subsidiary)
		throw new NotFoundException('Филиал в г. Новоуральске не найден')

	await prisma.employee.create({
		data: {
			username: 'AExampleAdmin',
			firstName: 'Александр',
			middleName: 'Сергеевич',
			lastName: 'Боровских',
			avatar: '/uploads/profile/no-image.png',
			role: Role.ADMIN,
			user: { connect: { id: user.id } },
			position: { connect: { id: position.id } },
			subsidiary: { connect: { id: subsidiary.id } }
		}
	})
}
