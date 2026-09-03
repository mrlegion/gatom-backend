import { ApiProperty } from '@nestjs/swagger'

import type { System } from '../../../../../../prisma/generated/client'
import type { StatusResponse } from '../../../../../shared/types'

export class CreateSystemResponse {
	@ApiProperty({
		title: 'Данные ответа',
		example: {
			status: 'ERROR',
			system: null
		}
	})
	public data: {
		status: StatusResponse
		system: System | null
	}
}
