import { Module } from '@nestjs/common';
import { DevelopmentTypeService } from './development-type.service';
import { DevelopmentTypeController } from './development-type.controller';

@Module({
  controllers: [DevelopmentTypeController],
  providers: [DevelopmentTypeService],
})
export class DevelopmentTypeModule {}
