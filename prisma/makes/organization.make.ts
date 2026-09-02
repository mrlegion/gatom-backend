import { prisma } from '../prisma-client'

export async function makeOrganization() {
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
