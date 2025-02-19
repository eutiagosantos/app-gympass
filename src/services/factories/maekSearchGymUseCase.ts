import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym-repository";
import { SearchGymsService } from "../searchGymsService";


export function makeSearchGymUseCase() {

    const repository = new PrismaGymRepository()
    const service = new SearchGymsService(repository)

    return service
}