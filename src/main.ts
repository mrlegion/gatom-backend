import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import {
	getCorsConfig,
	getSwaggerConfig,
	getValidationPipeConfig
} from './config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = app.get(ConfigService)

	const logger = new Logger()

	app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')))

	app.useGlobalPipes(new ValidationPipe(getValidationPipeConfig()))

	app.enableCors(getCorsConfig(config))

	const swagger = SwaggerModule.createDocument(app, getSwaggerConfig())
	SwaggerModule.setup('/docs', app, swagger, {
		yamlDocumentUrl: '/openapi.yaml',
		jsonDocumentUrl: '/openapi.json'
	})

	const host = config.getOrThrow<string>('HTTP_HOST')
	const port = config.getOrThrow<number>('HTTP_PORT')

	await app.listen(port)

	logger.log(`Backend started: ${host}`)
	logger.log(`Swagger started: ${host}/docs`)
}

void bootstrap()
