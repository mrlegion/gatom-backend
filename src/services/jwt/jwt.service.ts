import { TStringValue } from '@alexdevco/common'
import { Global, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService as JWT } from '@nestjs/jwt'

import { IJwtPayload } from '../../shared/types'

@Global()
@Injectable()
export class JwtService {
	private readonly secret: string
	private readonly expiresIn: TStringValue | number

	public constructor(
		private readonly config: ConfigService,
		private readonly jwt: JWT
	) {
		this.secret = config.getOrThrow<string>('JWT_SECRET')
		this.expiresIn = config.getOrThrow<TStringValue>('JWT_EXPIRES_IN')
	}

	public generate(payload: IJwtPayload) {
		return this.jwt.sign(payload, {
			secret: this.secret,
			expiresIn: this.expiresIn
		})
	}

	public verify(token: string) {
		return this.jwt.verify<IJwtPayload>(token, {
			secret: this.secret
		})
	}
}
