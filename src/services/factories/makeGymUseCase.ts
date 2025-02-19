import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym-repository";
import { GymService } from "../gymService";


export function makeGymUseCase() {
    const repository = new PrismaGymRepository()
    const service = new GymService(repository)

    return service
}