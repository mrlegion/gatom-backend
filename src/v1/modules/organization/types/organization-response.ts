import { Organization } from '../../../../../prisma/generated/client'
import { ISubsidiaryInclude } from '../../subsidiary/types'

export interface IOrganization extends Omit<
	Organization,
	'createdAt' | 'updatedAt'
> {}

export interface IOrganizationWithSubsidiary extends IOrganization {
	subsidiaries: ISubsidiaryInclude[] | null
}
