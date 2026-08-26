import { Module } from '@nestjs/common'

import {
	OrganizationRepository,
	SubsidiaryRepository
} from '../../../repositories'
import { PrismaService } from '../../../services'

import { SubsidiaryController } from './subsidiary.controller'
import { SubsidiaryService } from './subsidiary.service'

@Module({
	controllers: [SubsidiaryController],
	providers: [
		SubsidiaryService,
		SubsidiaryRepository,
		OrganizationRepository,
		PrismaService
	]
})
export class SubsidiaryModule {}
