import { NotFoundException } from '@nestjs/common'
import { hash } from 'argon2'

import { Role, SubsystemType } from './generated/enums'
import { prisma } from './prisma-client'

async function makeOrganization() {
	await prisma.organization.create({
		data: {
			title: 'Акционерное общество «Гринатом»',
			shortTitle: 'АО «Гринатом»',
			inn: '7706729736',
			kpp: '770601001',
			ogrn: '1097746819720',
			oktmo: '45384000'
		}
	})
}

async function makeSubsidiaries() {
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

async function makePosition() {
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

async function makeUser() {
	const user = await prisma.user.create({
		data: {
			email: 'admin@greenatom.ru',
			passwordHash: await hash('123456789'),
			passwordChangeAt: new Date().toISOString(),
			lastLogin: new Date().toISOString(),
			isActive: true,
			isInitial: false,
			isUseTwoFactor: false
		}
	})

	if (user) {
		await prisma.userPasswordHistory.create({
			data: {
				email: user.email,
				password: user.passwordHash,
				user: {
					connect: {
						id: user.id
					}
				}
			}
		})
	}
}

async function makeEmployee() {
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

async function makeSystem() {
	await prisma.system.create({
		data: {
			code: 'REA',
			name: 'Система РосЭнергоАтом (EED->EEQ->EEP)',
			prefix: 'ZEA',
			subsystems: {
				createMany: {
					data: [
						{
							code: 'EED',
							name: 'Система РосЭнергоАтом (EED)',
							type: SubsystemType.DEVELOPMENT,
							mandants: ['200']
						},
						{
							code: 'EEP',
							name: 'Система РосЭнергоАтом (EEP)',
							type: SubsystemType.PRODUCTION,
							mandants: ['400']
						},
						{
							code: 'EEQ',
							name: 'Система РосЭнергоАтом (EEQ)',
							type: SubsystemType.TEST,
							mandants: ['300', '320', '360']
						},
						{
							code: 'BR2',
							name: 'Система РосЭнергоАтом (BR2)',
							type: SubsystemType.PRODUCTION_COPY,
							mandants: ['400']
						}
					]
				}
			}
		}
	})

	await prisma.system.create({
		data: {
			code: 'SOLM',
			name: 'Система Solution Manager (SMD->SMQ->SMP)',
			prefix: 'ZG',
			subsystems: {
				createMany: {
					data: [
						{
							code: 'SMD',
							name: 'Система Solution Manager (SMD)',
							type: SubsystemType.DEVELOPMENT,
							mandants: ['100']
						},
						{
							code: 'SMP',
							name: 'Система Solution Manager (SMP)',
							type: SubsystemType.PRODUCTION,
							mandants: ['300']
						},
						{
							code: 'SMQ',
							name: 'Система Solution Manager (SMQ)',
							type: SubsystemType.TEST,
							mandants: ['200']
						}
					]
				}
			}
		}
	})

	await prisma.system.create({
		data: {
			code: 'ГК',
			name: 'Система ERP для госкорпорации (RED->RET->REP)',
			prefix: 'ZATM',
			subsystems: {
				createMany: {
					data: [
						{
							code: 'RED',
							name: 'Система ERP для госкорпорации (RED)',
							type: SubsystemType.DEVELOPMENT,
							mandants: ['100']
						},
						{
							code: 'REP',
							name: 'Система ERP для госкорпорации (REP)',
							type: SubsystemType.PRODUCTION,
							mandants: ['300', '320', '400', '420']
						},
						{
							code: 'RET',
							name: 'Система ERP для госкорпорации (RET)',
							type: SubsystemType.TEST,
							mandants: ['200', '220']
						}
					]
				}
			}
		}
	})

	await prisma.system.create({
		data: {
			code: 'КС2',
			name: 'Система ИСУП КС (NED-NEQ)',
			prefix: 'ZKS',
			subsystems: {
				createMany: {
					data: [
						{
							code: 'NED',
							name: 'Система ИСУП КС (NED)',
							type: SubsystemType.DEVELOPMENT,
							mandants: ['100', '130']
						},
						{
							code: 'NEP',
							name: 'Система ИСУП КС (NEP)',
							type: SubsystemType.PRODUCTION,
							mandants: ['300']
						},
						{
							code: 'NEQ',
							name: 'Система ИСУП КС (NEQ)',
							type: SubsystemType.TEST,
							mandants: ['210', '230', '240']
						},
						{
							code: 'NP2',
							name: 'Система ИСУП КС (NP2)',
							type: SubsystemType.PRODUCTION_COPY,
							mandants: ['300']
						}
					]
				}
			}
		}
	})

	await prisma.system.create({
		data: {
			code: 'КФШ',
			name: 'Мастер-система проекта КФШ (FED->FET)',
			prefix: 'ZFT',
			subsystems: {
				createMany: {
					data: [
						{
							code: 'FED',
							name: 'Мастер-система проекта КФШ (FED)',
							type: SubsystemType.DEVELOPMENT,
							mandants: ['100']
						}
					]
				}
			}
		}
	})

	await prisma.system.create({
		data: {
			code: 'КФШ2',
			name: 'Система S4 Hana',
			prefix: 'ZFT2',
			subsystems: {
				createMany: {
					data: [
						{
							code: 'HED',
							name: 'Система S4 Hana (HED)',
							type: SubsystemType.DEVELOPMENT,
							mandants: ['100']
						}
					]
				}
			}
		}
	})

	await prisma.system.create({
		data: {
			code: 'ТВЭЛ',
			name: 'Система ERP для ТВЭЛ-МСЗ  (TED->TEQ->TEP)',
			prefix: 'ZTK',
			subsystems: {
				createMany: {
					data: [
						{
							code: 'TED',
							name: 'Система ERP для ТВЭЛ-МСЗ (TED)',
							type: SubsystemType.DEVELOPMENT,
							mandants: ['100', '125', '400']
						},
						{
							code: 'TEP',
							name: 'Система ERP для ТВЭЛ-МСЗ (TEP)',
							type: SubsystemType.PRODUCTION,
							mandants: ['300']
						},
						{
							code: 'TEQ',
							name: 'Система ERP для ТВЭЛ-МСЗ (TEQ)',
							type: SubsystemType.TEST,
							mandants: ['200', '220', '225', '240']
						}
					]
				}
			}
		}
	})

	await prisma.system.create({
		data: {
			code: 'ТСЭ',
			name: 'Система ERP для Техснабэкспорт (SED -> SEQ -> SEP)',
			prefix: 'ZTS',
			subsystems: {
				createMany: {
					data: [
						{
							code: 'SED',
							name: 'Система ERP для Техснабэкспорт (SED)',
							type: SubsystemType.DEVELOPMENT,
							mandants: ['100']
						},
						{
							code: 'SEP',
							name: 'Система ERP для Техснабэкспорт (SEP)',
							type: SubsystemType.PRODUCTION,
							mandants: ['300']
						},
						{
							code: 'SEQ',
							name: 'Система ERP для Техснабэкспорт (SEQ)',
							type: SubsystemType.TEST,
							mandants: ['200', '210', '220', '230']
						}
					]
				}
			}
		}
	})
}

async function makeModule() {
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

async function makeDevTypes() {
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

async function up() {
	await makeOrganization()
	await makeSubsidiaries()
	await makePosition()
	await makeUser()
	await makeEmployee()
	await makeSystem()
	await makeModule()
	await makeDevTypes()
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "employees" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "user_password_histories" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "positions" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "subsidiaries" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "organizations" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "subsystems" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "systems" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "modules" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "development_types" RESTART IDENTITY CASCADE`
}

async function main() {
	try {
		await down()
		await up()
	} catch (e) {
		console.error(e)
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
