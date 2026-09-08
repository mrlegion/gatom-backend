import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateDevelopmentTypeRequest {
	@ApiProperty({
		title: 'Код типа доработки',
		example: 'REP',
		required: true
	})
	@IsString()
	@Length(2, 10)
	@IsNotEmpty()
	public code: string

	@ApiProperty({
		title: 'Наименование типа доработки',
		example: 'Отчёт',
		required: true
	})
	@IsString()
	@Length(3, 60)
	@IsNotEmpty()
	public name: string
}
