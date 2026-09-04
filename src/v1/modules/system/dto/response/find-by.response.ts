import { ApiProperty } from '@nestjs/swagger'

import type { System } from '../../../../../../prisma/generated/client'
import type { StatusResponse } from '../../../../../shared/types'

export class SystemFindByResponse {
	@ApiProperty({
		title: 'Ответ на запрос поиска системы',
		example: {
			status: 'OK',
			system: null
		}
	})
	public data: {
		status: StatusResponse
		system: System | null
	}
}

export class SystemFindByManyResponse {
	@ApiProperty({
		title: 'Ответ на запрос поиска системы',
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
