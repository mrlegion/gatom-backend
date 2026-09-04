import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class UpdateDevelopmentTypeRequest {
	@ApiProperty({
		type: 'string',
		name: 'Код типа доработки',
		example: 'REP'
	})
	@IsString()
	@Length(2, 10)
	@IsNotEmpty()
	public code: string

	@ApiProperty({
		type: 'string',
		name: 'Наименование типа доработки',
		example: 'Отчёт'
	})
	@IsString()
	@Length(3, 60)
	@IsNotEmpty()
	public name: string
}
