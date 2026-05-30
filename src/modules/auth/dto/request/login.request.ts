import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginRequest {
	@ApiProperty({
		title: 'Почта пользователя',
		example: 'example@mail.ru'
	})
	@IsString({ message: '' })
	@IsNotEmpty()
	@IsEmail({}, { message: '' })
	public email: string

	@ApiProperty({
		title: 'Пароль пользователя',
		example: '123456789'
	})
	@IsString()
	@IsNotEmpty()
	public password: string
}
