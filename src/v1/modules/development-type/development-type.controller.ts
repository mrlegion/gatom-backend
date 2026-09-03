import { Controller } from '@nestjs/common';
import { DevelopmentTypeService } from './development-type.service';

@Controller('development-type')
export class DevelopmentTypeController {
  constructor(private readonly developmentTypeService: DevelopmentTypeService) {}
}
