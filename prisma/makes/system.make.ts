import { SubsystemType } from '../generated/enums'
import { prisma } from '../prisma-client'

export async function makeSystem() {
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
