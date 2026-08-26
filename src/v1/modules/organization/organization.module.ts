import { Module } from '@nestjs/common'

import { OrganizationRepository } from '../../../repositories'
import { PrismaService } from '../../../services'

import { OrganizationController } from './organization.controller'
import { OrganizationService } from './organization.service'

@Module({
	controllers: [OrganizationController],
	providers: [OrganizationService, OrganizationRepository, PrismaService]
})
export class OrganizationModule {}
