import { GymRepository } from "@/repositories/gyms-repository"
import { Gym } from "@prisma/client"

interface IFetchNearByGymRequest {
    userLatitude: number
    userLongitude: number
}

interface IFetchNearByGymResponse {
    gyms: Gym[]
}

export class FetchNearByGym {
    constructor(private gymRepository: GymRepository
    ) { }
    async execute({ userLatitude, userLongitude }: IFetchNearByGymRequest): Promise<IFetchNearByGymResponse> {
        const gyms = await this.gymRepository.findManyNearBy(
            { latitude: userLatitude, longitude: userLongitude }
        )

        return {
            gyms,
        }
    }
}