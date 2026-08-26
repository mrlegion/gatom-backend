import { IsNotEmpty, IsString } from 'class-validator'

export class ConnectOrganizationRequest {
	@IsString()
	@IsNotEmpty()
	public organizationId: string
}
