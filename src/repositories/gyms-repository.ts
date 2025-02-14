import { Prisma, Gym } from "@prisma/client";


export interface GymRepository {
    findById(id: string): Promise<Gym | null>
    create(data: Prisma.GymCreateInput): Promise<Gym>
    findMany(query: string, page: number): Promise<Gym[]>
}