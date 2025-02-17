import { CheckInRepository } from "@/repositories/check-in-repository"
import { CheckIn } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError"
import dayjs from "dayjs"
import { LateCheckInValidationError } from "./errors/LateCheckInValidationError"

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

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            'minutes'
        )

        if (distanceInMinutesFromCheckInCreation > 20) {
            throw new LateCheckInValidationError()
        }

        checkIn.validated_at = new Date()

        await this.checkInRepository.save(checkIn)

        return {
            checkIn
        }
    }
}