import { faker } from '@faker-js/faker/locale/ru'
import { ApiProperty } from '@nestjs/swagger'
import {
	IsArray,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	Length
} from 'class-validator'

import { SubsystemType } from '../../../../../../prisma/generated/enums'

export class CreateSubsystemRequest {
	@ApiProperty({
		type: 'string',
		name: 'Код подсистемы',
		example: 'EED'
	})
	@IsString()
	@Length(2, 10)
	@IsNotEmpty()
	public code: string

	@ApiProperty({
		type: 'string',
		name: 'Наименование подсистемы',
		example: 'Разработка РЭА'
	})
	@IsString()
	@Length(3, 60)
	@IsNotEmpty()
	public name: string

	@ApiProperty({
		enum: SubsystemType,
		name: 'Тип подсистемы',
		example: SubsystemType.DEVELOPMENT,
		required: false
	})
	@IsEnum(SubsystemType)
	@IsOptional()
	public type?: SubsystemType

	@ApiProperty({
		type: [String],
		name: 'Мандаты подсистемы',
		example: ['100', '200'],
		required: false
	})
	@IsArray()
	@IsString({ each: true })
	@IsOptional()
	public mandants?: string[]

	@ApiProperty({
		type: 'string',
		name: 'Уникальный идентификатор системы',
		example: faker.string.uuid()
	})
	@IsString()
	@IsNotEmpty()
	public systemId: string
}
