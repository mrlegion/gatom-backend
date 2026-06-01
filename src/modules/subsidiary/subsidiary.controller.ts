import { Controller } from '@nestjs/common';
import { SubsidiaryService } from './subsidiary.service';

@Controller('subsidiary')
export class SubsidiaryController {
  constructor(private readonly subsidiaryService: SubsidiaryService) {}
}
