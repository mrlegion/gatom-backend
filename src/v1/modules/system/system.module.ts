import { Module } from '@nestjs/common'

import { SystemRepository } from '../../../repositories/system/system.repository'
import { PrismaService } from '../../../services'

import { SystemController } from './system.controller'
import { SystemService } from './system.service'

@Module({
	controllers: [SystemController],
	providers: [SystemService, PrismaService, SystemRepository]
})
export class SystemModule {}
