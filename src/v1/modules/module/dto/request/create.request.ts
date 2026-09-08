import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateModuleRequest {
	@ApiProperty({
		title: 'Код модуля',
		example: 'MM',
		required: true
	})
	@IsString()
	@Length(2, 10)
	@IsNotEmpty()
	public code: string

	@ApiProperty({
		title: 'Наименование модуля',
		example: 'Управление материалами',
		required: true
	})
	@IsString()
	@Length(3, 60)
	@IsNotEmpty()
	public name: string
}
