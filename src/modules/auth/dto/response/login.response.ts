import { faker } from '@faker-js/faker/locale/ru'
import { ApiProperty } from '@nestjs/swagger'

import {
	type IUserResponse,
	TokenExampleFactory,
	UserExampleFactory
} from '../../../../shared/types'

export class LoginResponse {
	@ApiProperty({
		title: 'Данные пользователя',
		example: UserExampleFactory.responseUser()
	})
	public user: IUserResponse

	@ApiProperty({
		title: 'Токен доступа',
		example: TokenExampleFactory.accessToken()
	})
	public accessToken: string
}
