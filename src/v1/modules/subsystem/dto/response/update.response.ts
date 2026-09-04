import { ApiProperty } from '@nestjs/swagger'

import type { Subsystem } from '../../../../../../prisma/generated/client'
import type { StatusResponse } from '../../../../../shared/types'

export class UpdateSubsystemResponse {
	@ApiProperty({
		title: 'Данные ответа',
		example: {
			status: 'ERROR',
			subsystem: null
		}
	})
	public data: {
		status: StatusResponse
		subsystem: Subsystem
	}
}
