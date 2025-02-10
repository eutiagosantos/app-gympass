import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository"
import { AuthenticateUserService } from "../authenticateService"


export function makeAuthenticateUseCase() {
    const prismaUsers = new PrismaUsersRepository()
    const authenticateService = new AuthenticateUserService(prismaUsers)

    return authenticateService
}