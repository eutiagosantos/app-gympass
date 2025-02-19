import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym-repository";
import { CheckInService } from "../checkInService";
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";


export function makeCheckInUseCase() {

    const gymRepository = new PrismaGymRepository()
    const checkInRepository = new PrismaCheckInRepository()

    const service = new CheckInService(checkInRepository, gymRepository)

    return service
}