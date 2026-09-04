import { Module } from '@nestjs/common'

import { DevelopmentTypeRepository } from '../../../repositories'
import { PrismaService } from '../../../services'

import { DevelopmentTypeController } from './development-type.controller'
import { DevelopmentTypeService } from './development-type.service'

@Module({
	controllers: [DevelopmentTypeController],
	providers: [
		DevelopmentTypeService,
		DevelopmentTypeRepository,
		PrismaService
	]
})
export class DevelopmentTypeModule {}
