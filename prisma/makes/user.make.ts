import { hash } from 'argon2'

import { prisma } from '../prisma-client'

export async function makeUser() {
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
