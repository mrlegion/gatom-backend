import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './modules/auth/auth.module'
import { OrganizationModule } from './modules/organization/organization.module';
import { PositionModule } from './modules/position/position.module';
import { SubsidiaryModule } from './modules/subsidiary/subsidiary.module';

@Module({
	imports: [
		AuthModule,
		ConfigModule.forRoot({
			isGlobal: true
		}),
		OrganizationModule,
		PositionModule,
		SubsidiaryModule
	]
})
export class AppModule {}
