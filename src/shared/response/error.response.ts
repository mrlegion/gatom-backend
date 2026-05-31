import { ApiProperty } from '@nestjs/swagger'

export class ErrorResponse {
	@ApiProperty({
		title: 'Сообщение об ошибке',
		example: 'Описание ошибки'
	})
	public message: string

	@ApiProperty({
		title: 'Технический код ошибки',
		example: 'NotFoundException'
	})
	public error: string

	@ApiProperty({
		title: 'Статус код ошибки',
		example: 404
	})
	public statusCode: number
}
