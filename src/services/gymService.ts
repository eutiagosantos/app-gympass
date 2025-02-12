import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/UserAlreadyExistsError";
import { Gym } from "@prisma/client";
import { GymRepository } from "@/repositories/gyms-repository";

interface IRegisterGymRequest {
    title: string
    description?: string
    phone?: string
    latitude: number
    longitude: number
}

interface IRegisterGymResponse {
    gym: Gym
}

export class GymService {
    constructor(private gymRepository: GymRepository) { }

    async execute({
        title,
        description,
        phone,
        latitude,
        longitude
    }: IRegisterGymRequest): Promise<IRegisterGymResponse> {

        const gym = await this.gymRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude
        })

        return {
            gym,
        }
    }
}
