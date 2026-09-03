import { ApiProperty } from '@nestjs/swagger'

import { System } from '../../../../../../prisma/generated/client'
import { StatusResponse } from '../../../../../shared/types'

export class GetAllSystemResponse {
	@ApiProperty({
		title: 'Ответ на запрос получить все данные систем',
		example: {
			status: 'OK',
			systems: []
		}
	})
	public data: {
		status: StatusResponse
		systems: System[]
	}
}
