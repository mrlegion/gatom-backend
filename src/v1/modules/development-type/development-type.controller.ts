import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'

import { DevelopmentTypeService } from './development-type.service'
import type { GetAllDevelopmentTypeResponse } from './dto'

@Controller('development-types')
export class DevelopmentTypeController {
	constructor(
		private readonly developmentTypeService: DevelopmentTypeService
	) {}

	@Get('')
	@HttpCode(HttpStatus.OK)
	public async getAll(): Promise<GetAllDevelopmentTypeResponse> {
		return await this.developmentTypeService.getAll()
	}
}
