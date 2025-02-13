import { CheckInRepository } from "@/repositories/check-in-repository";


interface IGetUserMetricsRequest {
    userId: string;
}

interface IGetUserMetricsResponse {
    count: number
}

export class GetUserMetricsService {

    constructor(private checkInRepository: CheckInRepository) { }
    async execute({ userId }: IGetUserMetricsRequest): Promise<IGetUserMetricsResponse> {
        const count = await this.checkInRepository.getUserMetrics(userId)

        return {
            count,
        }
    }
}