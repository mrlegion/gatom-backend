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
		title: 'Код подсистемы',
		example: 'EED'
	})
	@IsString()
	@Length(2, 10)
	@IsNotEmpty()
	public code: string

	@ApiProperty({
		title: 'Наименование подсистемы',
		example: 'Разработка РЭА'
	})
	@IsString()
	@Length(3, 60)
	@IsNotEmpty()
	public name: string

	@ApiProperty({
		title: 'Тип подсистемы',
		example: SubsystemType.DEVELOPMENT,
		required: false
	})
	@IsEnum(SubsystemType)
	@IsOptional()
	public type?: SubsystemType

	@ApiProperty({
		title: 'Мандаты подсистемы',
		example: ['100', '200'],
		required: false
	})
	@IsArray()
	@IsString({ each: true })
	@IsOptional()
	public mandants?: string[]

	@ApiProperty({
		title: 'Уникальный идентификатор системы',
		example: faker.string.uuid()
	})
	@IsString()
	@IsNotEmpty()
	public systemId: string
}
