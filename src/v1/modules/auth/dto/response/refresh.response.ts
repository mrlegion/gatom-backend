import { ApiProperty } from '@nestjs/swagger'

import {
	type IUserResponse,
	TokenExampleFactory,
	UserExampleFactory
} from '../../../../../shared/types'

export class RefreshResponse {
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
