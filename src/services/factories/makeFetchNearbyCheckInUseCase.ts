import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository"
import { FetchUserCheckIns } from "../fetchUserCheckInsService"


export function makeFetchNearByCheckInUseCase() {

    const repository = new PrismaCheckInRepository()
    const service = new FetchUserCheckIns(repository)

    return service
}