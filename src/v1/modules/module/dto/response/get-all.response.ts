import { ApiProperty } from '@nestjs/swagger'

import { Module } from '../../../../../../prisma/generated/client'
import { StatusResponse } from '../../../../../shared/types'

export class GetAllModuleResponse {
	@ApiProperty({
		title: 'Ответ на запрос получить все данные модулей',
		example: {
			status: 'OK',
			modules: []
		}
	})
	public data: {
		status: StatusResponse
		modules: Module[]
	}
}
