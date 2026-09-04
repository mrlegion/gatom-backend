import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import { GetAllSystemResponse } from './dto'
import { SystemService } from './system.service'

@Controller('systems')
export class SystemController {
	constructor(private readonly systemService: SystemService) {}

	@ApiOperation({
		summary: 'Получить все записи'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успешное выполнение запроса',
		type: GetAllSystemResponse
	})
	@Get('')
	@HttpCode(HttpStatus.OK)
	public async getAll(): Promise<GetAllSystemResponse> {
		return await this.systemService.getAll()
	}
}
