import { prisma } from '../prisma-client'

export async function makeDevTypes() {
	await prisma.developmentType.createMany({
		data: [
			{
				code: 'BSP',
				name: 'Приложение BSP'
			},
			{
				code: 'CRD',
				name: 'Карточка документооборота'
			},
			{
				code: 'DIA',
				name: 'Диалоговая программа'
			},
			{
				code: 'DIC',
				name: 'Изменение Словаря Данных'
			},
			{
				code: 'ENH',
				name: 'Расширение'
			},
			{
				code: 'EXT',
				name: 'Экстрактор для SAP BI (ФМ)'
			},
			{
				code: 'FM',
				name: 'Функциональный модуль'
			},
			{
				code: 'FRI',
				name: 'Fiori приложение'
			},
			{
				code: 'FRM',
				name: 'Печатная форма'
			},
			{
				code: 'IFS',
				name: 'Интерфейс'
			},
			{
				code: 'INF',
				name: 'Инфотип'
			},
			{
				code: 'LIB',
				name: 'Функциональная библиотека'
			},
			{
				code: 'LSM',
				name: 'LSMW'
			},
			{
				code: 'MDL',
				name: 'Функциональный блок'
			},
			{
				code: 'NOT',
				name: 'Имплементация ноты'
			},
			{
				code: 'ODT',
				name: 'OData сервис'
			},
			{
				code: 'OTH',
				name: 'Прочие изменения'
			},
			{
				code: 'REP',
				name: 'Отчет'
			},
			{
				code: 'SRH',
				name: 'Средство поиска'
			},
			{
				code: 'SYS',
				name: 'Модификация'
			},
			{
				code: 'TLB',
				name: 'Техническая библиотека'
			},
			{
				code: 'WDP',
				name: 'Разработка Web Dynpro'
			},
			{
				code: 'WF',
				name: 'WorkFlow'
			},
			{
				code: 'ZAM',
				name: 'Проверки, замещения, OpenFI, R'
			}
		]
	})
}
