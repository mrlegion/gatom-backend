import { Controller } from '@nestjs/common';
import { SubsystemService } from './subsystem.service';

@Controller('subsystem')
export class SubsystemController {
  constructor(private readonly subsystemService: SubsystemService) {}
}
