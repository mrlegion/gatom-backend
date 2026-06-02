import { Position } from '../../../../../prisma/generated/client'

export class CreatePositionResponse {
	public success: boolean
	public position: Position
}
