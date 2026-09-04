import { ApiProperty } from '@nestjs/swagger'

import type { DevelopmentType } from '../../../../../../prisma/generated/client'
import type { StatusResponse } from '../../../../../shared/types'

export class DevelopmentTypeFindByResponse {
	@ApiProperty({
		title: 'Ответ на запрос поиска типа доработки',
		example: {
			status: 'OK',
			developmentType: null
		}
	})
	public data: {
		status: StatusResponse
		developmentType: DevelopmentType | null
	}
}
