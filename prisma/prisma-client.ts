import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from './generated/client'

const prismaClientSingleton = () => {
	const adapter = new PrismaPg({
		user: String(process.env.DATABASE_USER),
		password: String(process.env.DATABASE_PASSWORD),
		host: String(process.env.DATABASE_HOST),
		port: Number(process.env.DATABASE_PORT),
		database: String(process.env.DATABASE_NAME)
	})
	return new PrismaClient({ adapter })
}

declare global {
	var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
