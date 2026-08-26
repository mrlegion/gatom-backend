import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class ChangePasswordRequest {
	@ApiProperty({
		title: 'Старый пароль пользователя'
	})
	@IsString()
	@IsNotEmpty()
	@Length(8, 16)
	public oldPassword: string

	@ApiProperty({
		title: 'Новый пароль пользователя'
	})
	@IsString()
	@IsNotEmpty()
	@Length(8, 16)
	public newPassword: string
}
