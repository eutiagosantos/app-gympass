import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { GetProfileService } from "../getProfileService";


export function makeGetProfileUseCase() {

    const repository = new PrismaUsersRepository()
    const service = new GetProfileService(repository)

    return service
}