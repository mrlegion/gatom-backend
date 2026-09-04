import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'

import { GetAllSubsystemResponse } from './dto'
import { SubsystemService } from './subsystem.service'

@Controller('subsystems')
export class SubsystemController {
	constructor(private readonly subsystemService: SubsystemService) {}

	@Get('')
	@HttpCode(HttpStatus.OK)
	public async getAll(): Promise<GetAllSubsystemResponse> {
		return await this.subsystemService.getAll()
	}
}
