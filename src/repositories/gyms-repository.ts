import { Prisma, Gym } from "@prisma/client";

export interface INearByGym {
    latitude: number
    longitude: number
}


export interface GymRepository {
    findById(id: string): Promise<Gym | null>
    create(data: Prisma.GymCreateInput): Promise<Gym>
    findManyNearBy(params: INearByGym): Promise<Gym[]>
    findMany(query: string, page: number): Promise<Gym[]>
}