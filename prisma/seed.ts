import { makeDevTypes } from './makes/development-types.make'
import { makeEmployee } from './makes/employee.make'
import { makeModule } from './makes/module.make'
import { makeOrganization } from './makes/organization.make'
import { makePosition } from './makes/position.make'
import { makeSubsidiaries } from './makes/subsidiaries.make'
import { makeSystem } from './makes/system.make'
import { makeUser } from './makes/user.make'
import { prisma } from './prisma-client'

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
