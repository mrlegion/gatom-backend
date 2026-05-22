import { Module } from '@nestjs/common'
import { PrismaModule } from './services/prisma/prisma.module';

@Module({
	imports: [PrismaModule]
})
export class AppModule {}
