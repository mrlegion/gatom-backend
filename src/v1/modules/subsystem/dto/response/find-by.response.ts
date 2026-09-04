import { ApiProperty } from '@nestjs/swagger'

import type { Subsystem } from '../../../../../../prisma/generated/client'
import type { StatusResponse } from '../../../../../shared/types'

export class SubsystemFindByResponse {
	@ApiProperty({
		title: 'Ответ на запрос поиска подсистемы',
		example: {
			status: 'OK',
			subsystem: null
		}
	})
	public data: {
		status: StatusResponse
		subsystem: Subsystem | null
	}
}

export class SubsystemFindByManyResponse {
	@ApiProperty({
		title: 'Ответ на запрос поиска подсистем',
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
