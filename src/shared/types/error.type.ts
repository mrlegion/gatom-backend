import { HttpStatus } from '@nestjs/common'

export class ErrorExampleFactory {
	public static notFound() {
		return {
			message: 'Данные не найдены',
			status: HttpStatus.NOT_FOUND,
			error: 'NotFoundException'
		}
	}

	public static badRequest() {
		return {
			message: 'Ошибка переданных данных',
			status: HttpStatus.BAD_REQUEST,
			error: 'NotFoundException'
		}
	}

	public static unauthorized() {
		return {
			message: 'Ошибка доступа к ресурсу',
			status: HttpStatus.UNAUTHORIZED,
			error: 'UnauthorizedException'
		}
	}

	public static internalServerError() {
		return {
			message: 'Ошибка сервера',
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			error: 'InternalServerErrorException'
		}
	}
}
