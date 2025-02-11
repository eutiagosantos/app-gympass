import { Prisma, CheckIn } from "@prisma/client";
import { CheckInRepository } from "../check-in-repository";
import { randomUUID } from "node:crypto";


export class InMemoryCheckInRepository implements CheckInRepository {
    public items: CheckIn[] = []

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            userId: data.userId,
            gymId: data.gymId,
            created_at: new Date(),
            validated_at: data.validated_at ? new Date(data.validated_at) : null
        }
        this.items.push(checkIn)
        return checkIn
    }

}