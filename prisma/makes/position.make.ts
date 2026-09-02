import { prisma } from '../prisma-client'

export async function makePosition() {
	await prisma.position.createMany({
		data: [
			{
				title: 'Аналитик',
				isNonActive: false
			},
			{
				title: 'Ведущий аналитик',
				isNonActive: false
			},
			{
				title: 'Ведущий специалист',
				isNonActive: false
			},
			{
				title: 'Ведущий эксперт',
				isNonActive: false
			},
			{
				title: 'Главный аналитик',
				isNonActive: false
			},
			{
				title: 'Главный специалист',
				isNonActive: false
			},
			{
				title: 'Младший разработчик',
				isNonActive: false
			},
			{
				title: 'Младший специалист',
				isNonActive: false
			},
			{
				title: 'Разработчик',
				isNonActive: false
			},
			{
				title: 'Специалист',
				isNonActive: false
			},
			{
				title: 'Стажер',
				isNonActive: false
			},
			{
				title: 'Старший специалист',
				isNonActive: false
			},
			{
				title: 'Техник',
				isNonActive: false
			},
			{
				title: 'Функциональный архитектор',
				isNonActive: false
			},
			{
				title: 'Эксперт',
				isNonActive: false
			},
			{
				title: 'Эксперт по разработке',
				isNonActive: false
			}
		]
	})
}
