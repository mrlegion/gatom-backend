import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './v1/modules/auth/auth.module'
import { OrganizationModule } from './v1/modules/organization/organization.module'
import { PositionModule } from './v1/modules/position/position.module'
import { SubsidiaryModule } from './v1/modules/subsidiary/subsidiary.module'
import { SystemModule } from './v1/modules/system/system.module'
import { SubsystemModule } from './v1/modules/subsystem/subsystem.module';
import { ModuleModule } from './v1/modules/module/module.module';

@Module({
	imports: [
		AuthModule,
		ConfigModule.forRoot({
			isGlobal: true
		}),
		OrganizationModule,
		PositionModule,
		SubsidiaryModule,
		SystemModule,
		SubsystemModule,
		ModuleModule
	]
})
export class AppModule {}
