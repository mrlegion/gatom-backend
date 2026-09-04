import { ApiProperty } from '@nestjs/swagger'

import { Subsystem } from '../../../../../../prisma/generated/client'
import { StatusResponse } from '../../../../../shared/types'

export class GetAllSubsystemResponse {
	@ApiProperty({
		title: 'Ответ на запрос получить все данные подсистем',
		example: {
			status: 'OK',
			subsystems: []
		}
	})
	public data: {
		status: StatusResponse
		subsystems: Subsystem[]
	}
}
