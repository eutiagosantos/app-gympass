import { CheckInRepository } from "@/repositories/check-in-repository"
import { CheckIn } from "@prisma/client"

interface IFetchUserCheckInsRequest {
    user_id: string
    page: number
}

interface IFetchUserCheckInsResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckIns {
    constructor(private checkInRepository: CheckInRepository
    ) { }
    async execute({ user_id, page }: IFetchUserCheckInsRequest): Promise<IFetchUserCheckInsResponse> {
        const checkIns = await this.checkInRepository.findManyByUserId(user_id, page)

        return {
            checkIns
        }
    }
}