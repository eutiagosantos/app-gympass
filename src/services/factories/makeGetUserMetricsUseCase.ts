import { GetUserMetricsService } from "../getUserMetricsService";
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";


export function makeGetUserMetricsUseCase() {

    const repostory = new PrismaCheckInRepository()
    const service = new GetUserMetricsService(repostory)

    return service
}