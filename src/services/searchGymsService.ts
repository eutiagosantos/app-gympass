import { Gym } from "@prisma/client";
import { GymRepository } from "@/repositories/gyms-repository";

interface ISearchGymsRequest {
    query: string
    page: number
}

interface ISearchGymsResponse {
    gyms: Gym[]
}

export class SearchGymsService {
    constructor(private gymRepository: GymRepository) { }

    async execute({
        query, page
    }: ISearchGymsRequest): Promise<ISearchGymsResponse> {

        const gyms = await this.gymRepository.findMany(query, page)

        return {
            gyms,
        }
    }
}
