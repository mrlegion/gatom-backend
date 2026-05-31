import { faker } from '@faker-js/faker/locale/ru'

export interface IJwtPayload {
	userId: string
	username: string
	role: string
}

export class TokenExampleFactory {
	public static accessToken() {
		return `${faker.string.alphanumeric(36)}.${faker.string.alphanumeric(90)}.${faker.string.alphanumeric(40)}`
	}
}
