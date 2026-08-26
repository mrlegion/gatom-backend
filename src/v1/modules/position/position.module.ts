import { Module } from '@nestjs/common'

import { PositionRepository } from '../../../repositories'
import { PrismaService } from '../../../services'

import { PositionController } from './position.controller'
import { PositionService } from './position.service'

@Module({
	controllers: [PositionController],
	providers: [PositionService, PrismaService, PositionRepository]
})
export class PositionModule {}
