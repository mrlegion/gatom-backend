import { ApiProperty } from '@nestjs/swagger'

import type { IUserResponse } from '../../../../shared/types'

export class LoginResponse {
	@ApiProperty({
		title: 'Данные пользователя'
	})
	public user: IUserResponse

	@ApiProperty({
		title: 'Токен доступа'
	})
	public accessToken: string
}
