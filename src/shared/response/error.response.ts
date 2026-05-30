import { ApiProperty } from '@nestjs/swagger'

export class ErrorResponse {
	@ApiProperty({
		title: 'Сообщение об ошибке'
	})
	public message: string

	@ApiProperty({
		title: 'Технический код ошибки'
	})
	public error: string

	@ApiProperty({
		title: 'Статус код ошибки'
	})
	public statusCode: number
}
