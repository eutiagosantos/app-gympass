import { CheckInRepository } from "@/repositories/check-in-repository"
import { GymRepository } from "@/repositories/gyms-repository"
import { CheckIn } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError"
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-cordinates"
import { CheckInOnSameDayError } from "./errors/CheckInOnSameDayError"
import { MaxDistanceError } from "./errors/MaxDistanceError"

interface IValidateCheckInRequest {
    id: string
}

interface IValidateCheckInResponse {
    checkIn: CheckIn
}

export class ValidateCheckInService {
    constructor(private checkInRepository: CheckInRepository
    ) { }
    async execute({ id }: IValidateCheckInRequest): Promise<IValidateCheckInResponse> {
        const checkIn = await this.checkInRepository.findById(id)

        if (!checkIn) {
            throw new ResourceNotFoundError()
        }

        checkIn.validated_at = new Date()

        await this.checkInRepository.save(checkIn)

        return {
            checkIn
        }
    }
}