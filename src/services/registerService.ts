import { prisma } from "@/database/prisma"
import { PrismaUsersRepository } from "@/repositories/prisma-user-repository";
import { hash } from "bcryptjs"

interface IRegisterUser {
    name: string;
    email: string;
    password: string;
}

export class RegisterService {
    constructor(private usersRepository: any) { }

    async execute({
        name,
        email,
        password
    }: IRegisterUser) {
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (userWithSameEmail) {
            throw new Error('User with same email already exists')
        }

        await this.usersRepository.create({
            name,
            email,
            password_hash
        })
    }
}
