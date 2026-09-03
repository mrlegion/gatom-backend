import { ApiProperty } from '@nestjs/swagger'

import type { StatusResponse } from '../../../../../shared/types'

export class DeleteSystemResponse {
	@ApiProperty({
		title: 'Данные запроса удаления',
		example: {
			status: 'OK'
		}
	})
	public data: {
		status: StatusResponse
	}
}
