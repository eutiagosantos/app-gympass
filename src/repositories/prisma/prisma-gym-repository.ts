import { Gym, Prisma } from "@prisma/client";
import { GymRepository, INearByGym } from "../gyms-repository";
import { prisma } from "@/database/prisma";

export class PrismaGymRepository implements GymRepository {
    async findById(id: string) {
        const gym = await prisma.gym.findUnique({
            where: {
                id,
            },
        })

        return gym
    }
    async create(data: Prisma.GymCreateInput) {
        const gym = await prisma.gym.create({
            data,
        })

        return gym
    }
    async findManyNearBy({ latitude, longitude }: INearByGym) {
        const gyms: Gym[] = await prisma.$queryRaw`
            SELECT * FROM gyms
            WHERE (
            6371 * ACOS(
                COS(RADIANS(${latitude})) * COS(RADIANS(latitude)) * 
                COS(RADIANS(longitude) - RADIANS(${longitude})) + 
                SIN(RADIANS(${latitude})) * SIN(RADIANS(latitude))
            )
        ) <= 10
        `
        return gyms
    }
    async findMany(query: string, page: number) {
        const gyms = await prisma.gym.findMany({
            where: {
                title: {
                    contains: query,
                },
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return gyms
    }

}