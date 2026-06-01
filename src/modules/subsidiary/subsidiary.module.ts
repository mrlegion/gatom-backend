import { Module } from '@nestjs/common';
import { SubsidiaryService } from './subsidiary.service';
import { SubsidiaryController } from './subsidiary.controller';

@Module({
  controllers: [SubsidiaryController],
  providers: [SubsidiaryService],
})
export class SubsidiaryModule {}
