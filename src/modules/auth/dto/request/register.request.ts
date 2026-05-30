import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator'

import { Role } from '../../../../../prisma/generated/enums'

export class RegisterRequest {
	@ApiProperty({
		title: 'Почта пользователя',
		example: 'example@mail.ru'
	})
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	public email: string

	@ApiProperty({
		title: 'Имя пользователя',
		example: 'IvaIvaIvanov'
	})
	@IsString()
	@IsNotEmpty()
	@Length(12, 16)
	public username: string

	@ApiProperty({
		title: 'Имя пользователя',
		example: 'Иван'
	})
	@IsString()
	@IsNotEmpty()
	public firstName: string

	@ApiProperty({
		title: 'Отчество пользователя',
		example: 'Иванович'
	})
	@IsString()
	@IsNotEmpty()
	public middleName: string

	@ApiProperty({
		title: 'Фамилия пользователя',
		example: 'Иванов'
	})
	@IsString()
	@IsNotEmpty()
	public lastName: string

	@ApiProperty({
		title: 'Пароль пользователя',
		example: '123456789'
	})
	@IsString()
	@IsNotEmpty()
	@Length(8, 16)
	public password: string

	@ApiProperty({
		title: 'Роль пользователя',
		example: Role.USER,
		enum: Role
	})
	@IsEnum(Role)
	public role: Role
}
