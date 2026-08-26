import { ApiProperty } from '@nestjs/swagger'

import { Position } from '../../../../../../prisma/generated/client'

export class GetAllResponse {
	@ApiProperty({
		title: 'Список должностей'
	})
	public positions: Position[]
}
