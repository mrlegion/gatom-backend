import { NotFoundException } from '@nestjs/common'

import { prisma } from '../prisma-client'

export async function makeSubsidiaries() {
	const organization = await prisma.organization.findUnique({
		where: { title: 'Акционерное общество «Гринатом»' }
	})
	if (!organization) throw new NotFoundException('Не найдена организация')

	await prisma.subsidiary.createMany({
		data: [
			{
				title: 'Филиал в г. Ангарске',
				address:
					'665814, Иркутская область, городской округ Ангарский, город Ангарск, территория Южный массив, квартал 2, строение 100',
				phones: ['+7 (3955) 54-71-56'],
				emails: ['angarsk@greenatom.ru'],
				organizationId: organization.id
			},
			{
				title: 'Филиал в г. Владимире',
				address: '600007, г. Владимир, ул. Северная, д. 1А',
				phones: ['+7 (831) 268-15-68', '+7 (49232) 9-42-72'],
				emails: [],
				organizationId: organization.id
			},
			{
				title: 'Сервисный центр в г. Волгодонске',
				address: '191036, г. Санкт-Петербург, ул. 2-ая Советская, д. 7',
				phones: ['+7 (812) 404-50-50'],
				emails: [],
				organizationId: organization.id
			},
			{
				title: '427622, г. Глазов, ул. Белова, 7',
				address: '427622, г. Глазов, ул. Белова, 7',
				phones: ['+7 (341) 419-63-46'],
				emails: ['Glazov@greenatom.ru'],
				organizationId: organization.id
			},
			{
				title: 'Сервисный центр в г. Димитровграде',
				address:
					'433510, Ульяновская область г. Димитровград, Западное шоссе, 9',
				phones: ['+7 (842) 356-62-82'],
				emails: [],
				organizationId: organization.id
			},
			{
				title: 'Сервисный центр в г. Екатеринбурге',
				address:
					'624130, Свердловская область, г. Новоуральск, Центральный проезд, 8А, строение 21',
				phones: ['+7 (343) 709-20-42'],
				emails: ['Novouralsk@greenatom.ru'],
				organizationId: organization.id
			},
			{
				title: 'Сервисный центр в г. Железногорске',
				address: '662971, г. Железногорск, ул. Ленина, 39',
				phones: ['+7 (391) 699-37-37'],
				emails: [],
				organizationId: organization.id
			},
			{
				title: 'Сервисный центр в г. Заречном',
				address:
					'624130, Свердловская область, г. Новоуральск, Центральный проезд, 8А, строение 21',
				phones: ['+7 (343) 709-20-42'],
				emails: ['Novouralsk@greenatom.ru'],
				organizationId: organization.id
			},
			{
				title: 'Филиал в г. Зеленогорске',
				address:
					'663690, Красноярский край, г. Зеленогорск, ул. Первая Промышленная, д. 1, зд. 25',
				phones: [' +7 (391) 699-43-49'],
				emails: ['zelenogorsk@greenatom.ru'],
				organizationId: organization.id
			},
			{
				title: 'Филиал в г. Коврове',
				address: '601909, г. Ковров, ул. Социалистическая, д. 26',
				phones: ['+7 (492) 329-42-72'],
				emails: ['kovrov@greenatom.ru'],
				organizationId: organization.id
			},
			{
				title: 'Сервисный центр в г. Краснокаменске',
				address:
					'674673, г. Краснокаменск, ул. Октябрьская, 8 здание Главного вычислительного центра',
				phones: ['+7 (302) 452-53-07'],
				emails: ['krasnokamensk@greenatom.ru'],
				organizationId: organization.id
			},
			{
				title: 'Сервисный центр в г. Мурманске',
				address: '183032, г. Мурманск, Кольский проспект, 10',
				phones: ['+7 (815) 255-33-01'],
				emails: [],
				organizationId: organization.id
			},
			{
				title: 'Филиал в г. Нижнем Новгороде',
				address: '603074, г. Нижний Новгород, Проспект Ленина, 93',
				phones: ['+7 (831) 268-15-68'],
				emails: ['nnovgorod@greenatom.ru'],
				organizationId: organization.id
			},
			{
				title: 'Филиал в г. Новосибирске',
				address: '630110, г. Новосибирск, ул. Б. Хмельницкого, 94',
				phones: [
					'+7 (383) 274-87-27',
					'+7 (383) 274-82-02',
					'+7 (383 )274-83-74'
				],
				emails: ['novosibirsk@greenatom.ru'],
				organizationId: organization.id
			},
			{
				title: 'Филиал в г. Новоуральске',
				address:
					'624130, Свердловская область, г. Новоуральск, Центральный проезд, 8А, строение 21',
				phones: ['+7 (343) 709-20-42'],
				emails: ['Novouralsk@greenatom.ru'],
				organizationId: organization.id
			},
			{
				title: 'Сервисный центр в г. Петрозаводске',
				address: '191036, г. Санкт-Петербург, ул. 2-ая Советская, д. 7',
				phones: ['+7 (812) 404-50-50'],
				emails: [],
				organizationId: organization.id
			},
			{
				title: 'Филиал в г. Подольске',
				address:
					'142103, Московская область, г. Подольск, ул. Железнодорожная, д. 2',
				phones: ['+7 (495) 747-10-25'],
				emails: [],
				organizationId: organization.id
			},
			{
				title: 'Филиал в г. Санкт-Петербурге',
				address:
					'194100, г. Санкт-Петербург, Большой Сампсониевский пр-т, д. 68Н, оф. 405',
				phones: ['+7 (812) 339-15-15, доб. 56293'],
				emails: [],
				organizationId: organization.id
			},
			{
				title: 'Филиал в г. Сарове',
				address:
					'607328, Нижегородская область, Дивеевский район, поселок Сатис, ул. Парковая, д. 3',
				phones: ['+7 (831) 307-09-70'],
				emails: ['Sarov@Greenatom.ru'],
				organizationId: organization.id
			},
			{
				title: 'Филиал в г. Северске',
				address:
					'636039, Томская область, г. Северск, ул. Ленина, д. 90',
				phones: ['+7 (3823) 52-45-46', '+7 (382) 352-15-30'],
				emails: ['seversk@greenatom.ru'],
				organizationId: organization.id
			},
			{
				title: 'Филиал в г. Электростали',
				address:
					'144001, Московская область, г. Электросталь, ул. К. Маркса, д. 12',
				phones: ['+7 (496) 577-51-54'],
				emails: [],
				organizationId: organization.id
			}
		]
	})
}
