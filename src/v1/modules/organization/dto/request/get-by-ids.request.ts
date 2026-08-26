import { ArrayMinSize, IsArray, IsString } from 'class-validator'

export class GetByIdsRequest {
	@IsArray()
	@ArrayMinSize(1)
	@IsString({ each: true })
	public id: string[]
}
