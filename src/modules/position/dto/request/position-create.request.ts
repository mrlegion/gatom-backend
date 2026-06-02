import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength, MinLength } from 'class-validator'

export class PositionCreateRequest {
	@ApiProperty({
		title: 'Наименование должности',
		example: 'Специалист'
	})
	@IsString()
	@MinLength(6)
	@MaxLength(100)
	public title: string
}
