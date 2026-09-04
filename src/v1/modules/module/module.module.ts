import { Module } from '@nestjs/common'

import { ModuleRepository } from '../../../repositories'
import { PrismaService } from '../../../services'

import { ModuleController } from './module.controller'
import { ModuleService } from './module.service'

@Module({
	controllers: [ModuleController],
	providers: [ModuleService, ModuleRepository, PrismaService]
})
export class ModuleModule {}
