import { Position } from '../../../../../../prisma/generated/client'

export class UpdatePositionResponse {
	public success: boolean
	public position: Position
}
