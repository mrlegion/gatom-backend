import { ApiProperty } from '@nestjs/swagger'

import type { IUserResponse } from '../../../../shared/types'

export class RegisterResponse {
	@ApiProperty({
		title: 'Успешность операции',
		example: true
	})
	public success: boolean

	@ApiProperty({
		title: 'Данные пользователя'
	})
	public user: IUserResponse

	@ApiProperty({
		title: 'Токен доступа',
		example: 'your-secret-token'
	})
	public accessToken: string
}
