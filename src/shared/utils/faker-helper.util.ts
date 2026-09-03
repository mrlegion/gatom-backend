import { faker } from '@faker-js/faker/locale/ru'

export const generateUsernameWithFixedLength = (
	min: number = 12,
	max: number = 16
): string => {
	const targetLength = faker.number.int({ min, max })

	let username = faker.internet.username()

	while (username.length < targetLength) {
		username += faker.number.int({ min: 0, max: 9 })
	}

	if (username.length > targetLength) {
		username = username.substring(0, targetLength)
	}

	return username
}

export const generateSystemArray = (length: number = 2) => {
	let index = 0
	while (index < length) {
		const code = faker.string.alpha({ length: { min: 2, max: 4 } })
	}
}
