import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { getJwtConfig } from '../../config'
import { JwtStrategy } from '../../config/strategies/jwt.strategy'
import {
	EmployeeRepository,
	PasswordHistoryRepository,
	PositionRepository,
	SubsidiaryRepository,
	UserRepository
} from '../../repositories'
import { PrismaService } from '../../services'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		UserRepository,
		EmployeeRepository,
		PositionRepository,
		SubsidiaryRepository,
		PrismaService,
		PasswordHistoryRepository,
		JwtStrategy
	]
})
export class AuthModule {}
