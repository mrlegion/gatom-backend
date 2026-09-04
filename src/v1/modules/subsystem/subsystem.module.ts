import { Module } from '@nestjs/common'

import { SubsystemRepository } from '../../../repositories/subsystem/subsystem.repository'
import { PrismaService } from '../../../services'

import { SubsystemController } from './subsystem.controller'
import { SubsystemService } from './subsystem.service'

@Module({
	controllers: [SubsystemController],
	providers: [SubsystemService, SubsystemRepository, PrismaService]
})
export class SubsystemModule {}
