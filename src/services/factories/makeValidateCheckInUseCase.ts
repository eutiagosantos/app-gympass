import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";
import { ValidateCheckInService } from "../validateCheckInService";


export function makeValidateCheckInUseCase() {

    const repository = new PrismaCheckInRepository()
    const service = new ValidateCheckInService(repository)

    return service
}