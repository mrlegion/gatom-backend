import { ApiProperty } from '@nestjs/swagger'

import type { DevelopmentType } from '../../../../../../prisma/generated/client'
import type { StatusResponse } from '../../../../../shared/types'

export class CreateDevelopmentTypeResponse {
	@ApiProperty({
		title: 'Данные ответа',
		example: {
			status: 'ERROR',
			developmentType: null
		}
	})
	public data: {
		status: StatusResponse
		developmentType: DevelopmentType | null
	}
}
