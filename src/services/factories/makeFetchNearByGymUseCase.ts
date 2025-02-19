import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym-repository";
import { FetchNearByGym } from "../fetchNearByGymService";


export function makeFetchNearByGymUseCase() {

    const repository = new PrismaGymRepository()
    const service = new FetchNearByGym(repository)

    return service
}