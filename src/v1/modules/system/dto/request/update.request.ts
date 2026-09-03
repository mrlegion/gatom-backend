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
		type: 'string',
		name: 'Код системы',
		example: 'REA'
	})
	@IsString()
	@Length(2, 4)
	@IsNotEmpty()
	public code: string

	@ApiProperty({
		type: 'string',
		name: 'Наименование системы',
		example: 'Система РосЭнергоАтом (EED->EEQ->EEP)'
	})
	@IsString()
	@Length(3, 60)
	@IsNotEmpty()
	public name: string

	@ApiProperty({
		type: 'string',
		name: 'Префикс системы',
		example: 'ZEA'
	})
	@IsString()
	@MaxLength(4)
	@IsOptional()
	public prefix: string
}
