import { Subsidiary } from '../../../../prisma/generated/client'

export interface ISubsidiary extends Omit<
	Subsidiary,
	'createdAt' | 'updatedAt'
> {}

export interface ISubsidiaryInclude extends Omit<
	Subsidiary,
	'createdAt' | 'updatedAt' | 'organizationId'
> {}
