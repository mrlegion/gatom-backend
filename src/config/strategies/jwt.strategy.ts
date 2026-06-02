import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { UserRepository } from '../../repositories'
import { IJwtPayload } from '../../shared/types'
import { pick } from '../../shared/utils'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	public constructor(
		private config: ConfigService,
		private userRepository: UserRepository
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: config.getOrThrow<string>('JWT_SECRET')
		})
	}

	public async validate({ userId }: IJwtPayload) {
		const user = await this.userRepository.findById(userId)
		if (!user) return null

		return pick(user, ['id', 'email', 'isActive'])
	}
}
