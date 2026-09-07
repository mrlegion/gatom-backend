import { ApiProperty } from '@nestjs/swagger'
import {
	IsNotEmpty,
	IsOptional,
	IsString,
	Length,
	MaxLength
} from 'class-validator'

export class UpdateSystemRequest {
	@ApiProperty({
		title: 'Код системы',
		example: 'REA'
	})
	@IsString()
	@Length(2, 4)
	@IsNotEmpty()
	public code: string

	@ApiProperty({
		title: 'Наименование системы',
		example: 'Система РосЭнергоАтом (EED->EEQ->EEP)'
	})
	@IsString()
	@Length(3, 60)
	@IsNotEmpty()
	public name: string

	@ApiProperty({
		title: 'Префикс системы',
		example: 'ZEA'
	})
	@IsString()
	@MaxLength(4)
	@IsOptional()
	public prefix: string
}
