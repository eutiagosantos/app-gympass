import { CheckInRepository } from "@/repositories/check-in-repository"
import { CheckIn } from "@prisma/client"

interface ICheckInRequest {
    user_id: string
    gym_id: string
}

interface ICheckInResponse {
    checkIn: CheckIn
}

export class CheckInService {
    constructor(private checkInRepository: CheckInRepository) { }
    async execute({ user_id, gym_id }: ICheckInRequest): Promise<ICheckInResponse> {
        const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
            user_id,
            new Date()
        )

        if (checkInOnSameDay) {
            throw new Error()
        }

        const checkIn = await this.checkInRepository.create({
            userId: user_id,
            gymId: gym_id
        })

        return {
            checkIn
        }
    }
}