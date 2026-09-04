import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateModuleRequest {
	@ApiProperty({
		type: 'string',
		name: 'Код модуля',
		example: 'MM'
	})
	@IsString()
	@Length(2, 10)
	@IsNotEmpty()
	public code: string

	@ApiProperty({
		type: 'string',
		name: 'Наименование модуля',
		example: 'Управление материалами'
	})
	@IsString()
	@Length(3, 60)
	@IsNotEmpty()
	public name: string
}
