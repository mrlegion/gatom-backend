import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateOrganizationRequest {
	@ApiProperty({
		title: 'Наименование организации',
		example: 'Акционерное общество «Гринатом»'
	})
	@IsString()
	@IsNotEmpty()
	@Length(5, 250)
	public title: string

	@ApiProperty({
		title: 'Короткое наименование',
		example: 'АО «Гринатом»'
	})
	@IsString()
	@IsNotEmpty()
	@Length(5, 100)
	public shortTitle: string

	@ApiProperty({
		title: 'ОГРН',
		example: '1097746819720'
	})
	@IsString()
	@IsNotEmpty()
	@Length(10, 13)
	public ogrn: string

	@ApiProperty({
		title: 'ИНН',
		example: '7706729736'
	})
	@IsString()
	@IsNotEmpty()
	@Length(8, 10)
	public inn: string

	@ApiProperty({
		title: 'КПП',
		example: '770601001'
	})
	@IsString()
	@IsNotEmpty()
	@Length(8, 10)
	public kpp: string

	@ApiProperty({
		title: 'ОКТМО',
		example: '45384000'
	})
	@IsString()
	@IsNotEmpty()
	@Length(6, 8)
	public oktmo: string
}
