import { ApiProperty } from '@nestjs/swagger'

export class ConnectSubsidiaryToOrganizationResponse {
	@ApiProperty({
		description:
			'Описывает результат выполнения операции подключения Филиала к Организации',
		title: 'Результат выполнения',
		example: true
	})
	public result: boolean
}
