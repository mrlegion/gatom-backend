import { ApiProperty } from '@nestjs/swagger'

import { DevelopmentType } from '../../../../../../prisma/generated/client'
import { StatusResponse } from '../../../../../shared/types'

export class GetAllDevelopmentTypeResponse {
	@ApiProperty({
		title: 'Ответ на запрос получить все данные типов доработок',
		example: {
			status: 'OK',
			developmentTypes: []
		}
	})
	public data: {
		status: StatusResponse
		developmentTypes: DevelopmentType[]
	}
}
