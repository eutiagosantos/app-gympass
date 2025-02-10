import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/UserAlreadyExistsError";
import { User } from "@prisma/client";

interface IRegisterUser {
    name: string;
    email: string;
    password: string;
}

interface IRegisterResponse {
    user: User
}

export class RegisterService {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        name,
        email,
        password
    }: IRegisterUser): Promise<IRegisterResponse> {
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash
        })

        return {
            user,
        }
    }
}
