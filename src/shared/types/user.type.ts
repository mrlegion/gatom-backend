import { faker } from '@faker-js/faker/locale/ru'

import { User } from '../../../prisma/generated/client'
import { generateUsernameWithFixedLength } from '../utils'

export interface IUserResponse extends Omit<
	User,
	'passwordHash' | 'createdAt' | 'updatedAt' | 'lastLogin'
> {}

export class UserExampleFactory {
	public static responseUser() {
		const username = generateUsernameWithFixedLength()

		return {
			id: faker.string.uuid(),
			username,
			email: faker.internet.email({
				firstName: username,
				lastName: undefined,
				provider: 'greenatom.ru'
			}),
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			middleName: faker.person.middleName(),
			avatar: faker.image.avatar(),
			role: faker.helpers.arrayElement([
				'USER',
				'ADMIN',
				'DEVELOPER',
				'CONSULTANT'
			]),
			isActive: faker.datatype.boolean(),
			isInitial: faker.datatype.boolean(),
			isUseTwoFactor: faker.datatype.boolean()
		}
	}

	public static register() {
		const username = generateUsernameWithFixedLength()

		return {
			email: faker.internet.email({
				firstName: username,
				lastName: undefined,
				provider: 'greenatom.ru'
			}),
			username,
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			middleName: faker.person.middleName(),
			password: '123456789',
			role: 'USER'
		}
	}
}
