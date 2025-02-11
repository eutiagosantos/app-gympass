import { CheckInRepository } from "@/repositories/check-in-repository"
import { GymRepository } from "@/repositories/gyms-repository"
import { CheckIn } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError"
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-cordinates"

interface ICheckInRequest {
    user_id: string
    gym_id: string
    userLatitude: number
    userLongitude: number
}

interface ICheckInResponse {
    checkIn: CheckIn
}

export class CheckInService {
    constructor(private checkInRepository: CheckInRepository,
        private gymRepository: GymRepository
    ) { }
    async execute({ user_id, gym_id, userLatitude, userLongitude }: ICheckInRequest): Promise<ICheckInResponse> {
        const gym = await this.gymRepository.findById(gym_id)

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
            user_id,
            new Date()
        )

        if (checkInOnSameDay) {
            throw new Error()
        }

        const distance = getDistanceBetweenCoordinates(
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
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