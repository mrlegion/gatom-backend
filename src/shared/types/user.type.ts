import { User } from '../../../prisma/generated/client'

export interface IUserResponse extends Omit<
	User,
	'passwordHash' | 'createdAt' | 'updatedAt' | 'lastLogin'
> {}
