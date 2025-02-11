import { CheckInRepository } from "@/repositories/check-in-repository"
import { GymRepository } from "@/repositories/gyms-repository"
import { CheckIn } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError"

interface ICheckInRequest {
    user_id: string
    gym_id: string
    latitude: number
    longitude: number
}

interface ICheckInResponse {
    checkIn: CheckIn
}

export class CheckInService {
    constructor(private checkInRepository: CheckInRepository,
        private gymRepository: GymRepository
    ) { }
    async execute({ user_id, gym_id }: ICheckInRequest): Promise<ICheckInResponse> {
        const isGymValid = await this.gymRepository.findById(gym_id)

        if (!isGymValid) {
            throw new ResourceNotFoundError()
        }

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