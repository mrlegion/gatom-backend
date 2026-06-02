import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator'

export class PositionUpdateRequest {
	@ApiProperty({
		title: 'Наименование должности',
		example: 'Старший специалист'
	})
	@IsString()
	@IsNotEmpty()
	@Length(6, 100)
	public title: string

	@ApiProperty({
		title: 'Деактивация должности',
		example: false
	})
	@IsBoolean()
	public isNonActive: boolean
}
