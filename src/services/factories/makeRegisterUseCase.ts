import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository"
import { RegisterService } from "../registerService"

export function makeRegisterUseCase() {
    const prismaUsers = new PrismaUsersRepository()
    const registerService = new RegisterService(prismaUsers)

    return registerService
}