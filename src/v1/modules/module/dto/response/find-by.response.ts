import { ApiProperty } from '@nestjs/swagger'

import type { Module } from '../../../../../../prisma/generated/client'
import type { StatusResponse } from '../../../../../shared/types'

export class ModuleFindByResponse {
	@ApiProperty({
		title: 'Ответ на запрос поиска модуля',
		example: {
			status: 'OK',
			module: null
		}
	})
	public data: {
		status: StatusResponse
		module: Module | null
	}
}
