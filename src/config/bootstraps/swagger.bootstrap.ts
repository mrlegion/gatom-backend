import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger'

export function getSwaggerConfig(): Omit<OpenAPIObject, 'paths'> {
	return new DocumentBuilder()
		.setTitle('G_Atom API')
		.setDescription('API интерфейс для приложения GATOM')
		.setVersion('0.1.0')
		.addBearerAuth()
		.build()
}
