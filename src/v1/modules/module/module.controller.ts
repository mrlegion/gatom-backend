import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'

import type { GetAllModuleResponse } from './dto'
import { ModuleService } from './module.service'

@Controller('modules')
export class ModuleController {
	constructor(private readonly moduleService: ModuleService) {}

	@Get('')
	@HttpCode(HttpStatus.OK)
	public async getAll(): Promise<GetAllModuleResponse> {
		return await this.moduleService.getAll()
	}
}
