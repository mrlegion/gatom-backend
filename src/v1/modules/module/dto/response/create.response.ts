import { ApiProperty } from '@nestjs/swagger'

import type { Module } from '../../../../../../prisma/generated/client'
import type { StatusResponse } from '../../../../../shared/types'

export class CreateModuleResponse {
	@ApiProperty({
		title: 'Данные ответа',
		example: {
			status: 'ERROR',
			module: null
		}
	})
	public data: {
		status: StatusResponse
		module: Module | null
	}
}
