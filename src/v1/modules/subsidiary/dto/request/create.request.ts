import {
	ArrayMinSize,
	IsArray,
	IsNotEmpty,
	IsString,
	Length
} from 'class-validator'

export class CreateSubsidiaryRequest {
	@IsString()
	@Length(3, 100)
	@IsNotEmpty()
	public title: string

	@IsString()
	@IsNotEmpty()
	public address: string

	@IsArray()
	@ArrayMinSize(0)
	@IsString({ each: true })
	@Length(11, 25, { each: true })
	public phones: string[]

	@IsArray()
	@ArrayMinSize(0)
	@IsString({ each: true })
	@Length(11, 100, { each: true })
	public emails: string[]

	@IsString()
	@IsNotEmpty()
	public organizationId: string
}
