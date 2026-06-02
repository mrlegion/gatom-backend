import {
	Global,
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from '../../../prisma/generated/client'

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	private readonly logger = new Logger(PrismaService.name)

	public constructor(private readonly config: ConfigService) {
		const adapter = new PrismaPg({
			user: config.getOrThrow<string>('DATABASE_USER'),
			password: config.getOrThrow<string>('DATABASE_PASSWORD'),
			host: config.getOrThrow<string>('DATABASE_HOST'),
			port: config.getOrThrow<number>('DATABASE_PORT'),
			database: config.getOrThrow<string>('DATABASE_NAME')
		})

		super({ adapter })
	}

	public async onModuleInit(): Promise<void> {
		const start = Date.now()

		this.logger.debug('Connecting to database...')

		try {
			await this.$connect()

			this.logger.debug(
				`Database connection established (time=${Date.now() - start}ms)`
			)
		} catch (error) {
			this.logger.error('Database connection failed: ', error)
			throw error
		}
	}

	public async onModuleDestroy(): Promise<void> {
		try {
			this.logger.debug('Disconnecting from database...')
			await this.$disconnect()
		} catch (error) {
			this.logger.error('Database disconnect failed: ', error)
			throw error
		}
	}
}
