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

export class UpdateSubsystemRequest {
	@ApiProperty({
		title: 'Код подсистемы',
		example: 'EED',
		required: true
	})
	@IsString()
	@Length(2, 10)
	@IsNotEmpty()
	public code: string

	@ApiProperty({
		title: 'Наименование подсистемы',
		example: 'Разработка РЭА',
		required: true
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
		example: ['100', '120'],
		required: false
	})
	@IsArray()
	@IsString({ each: true })
	@IsOptional()
	public mandants?: string[]

	@ApiProperty({
		title: 'Уникальный идентификатор системы',
		example: faker.string.uuid(),
		required: true
	})
	@IsString()
	@IsNotEmpty()
	public systemId: string
}
