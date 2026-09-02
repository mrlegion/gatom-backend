import { prisma } from '../prisma-client'

export async function makeModule() {
	await prisma.module.createMany({
		data: [
			{
				code: 'BC',
				name: 'Базис'
			},
			{
				code: 'CA',
				name: 'Компоненты, общие для всех приложений'
			},
			{
				code: 'CO',
				name: 'Контролинг'
			},
			{
				code: 'DMS',
				name: 'Управление документами'
			},
			{
				code: 'FI',
				name: 'Финансы'
			},
			{
				code: 'FM',
				name: 'Бюджет'
			},
			{
				code: 'HR',
				name: 'Кадры'
			},
			{
				code: 'LIB',
				name: 'Технические библиотеки'
			},
			{
				code: 'MM',
				name: 'Материалы'
			},
			{
				code: 'NSI',
				name: 'Нормативно-справочная информация (NSI)'
			},
			{
				code: 'PM',
				name: 'ТОРО'
			},
			{
				code: 'PP',
				name: 'Управление производством'
			},
			{
				code: 'PS',
				name: 'Системы проектов'
			},
			{
				code: 'QM',
				name: 'Управление качеством'
			},
			{
				code: 'RCM',
				name: 'Case and Records Management'
			},
			{
				code: 'RE',
				name: 'Недвижимость'
			},
			{
				code: 'SD',
				name: 'Сбыт'
			},
			{
				code: 'SM',
				name: 'Разработки для Solution Manager'
			},
			{
				code: 'SRM',
				name: 'Управление взаимоотношениями с поставщиками'
			},
			{
				code: 'UTL',
				name: 'Утилиты'
			},
			{
				code: 'НСИ',
				name: 'Нормативно-справочная информация (НСИ)'
			}
		]
	})
}
