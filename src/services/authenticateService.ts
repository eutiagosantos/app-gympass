import { UsersRepository } from '@/repositories/users-repository';
import { User } from "@prisma/client";
import { InvalidCredentialsError } from './errors/InvalidCredentialsError';
import { compare } from 'bcryptjs';


interface IAuthenticateUserRequest {
    email: string;
    password: string;
}

interface IAuthenticateUserResponse {
    user: User
}

export class AuthenticateUserService {
    constructor(
        private userRepository: UsersRepository
    ) { }
    async execute({ email, password }: IAuthenticateUserRequest): Promise<IAuthenticateUserResponse> {

        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordsMatch = await compare(password, user.password_hash)

        if (!doesPasswordsMatch) {
            throw new InvalidCredentialsError()
        }

        return {
            user,
        }
    }
}