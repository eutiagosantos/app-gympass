import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";


interface IGetProfileUseCaseRequest {
    userId: string;
}

interface IGetProfileUseCaseResponse {
    user: User;
}

export class GetProfileService {

    constructor(private userRepository: UsersRepository) { }
    async execute({ userId }: IGetProfileUseCaseRequest): Promise<IGetProfileUseCaseResponse> {
        const user = await this.userRepository.findById(userId)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        return {
            user,
        }
    }
}