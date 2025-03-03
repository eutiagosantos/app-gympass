import { Prisma, CheckIn } from "@prisma/client";
import { CheckInRepository } from "../check-in-repository";
import { randomUUID } from "node:crypto";
import dayjs from 'dayjs'

export class InMemoryCheckInRepository implements CheckInRepository {

    public items: CheckIn[] = []

    async findByUserIdOnDate(userId: string, date: Date) {

        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkInOnSameDate = this.items.find((checkIn) => {
            const checkInDate = dayjs(checkIn.created_at)
            const isOnSameDay = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

            return checkIn.userId === userId && isOnSameDay
        })

        if (!checkInOnSameDate) {
            return null
        }

        return checkInOnSameDate
    }
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

    async findManyByUserId(userId: string, page: number) {
        return this.items.filter((item) => item.userId === userId).slice((page - 1) * 20, page * 20)
    }

    async getUserMetrics(userId: string) {
        return this.items.filter((item) => item.userId === userId).length
    }

    async findById(id: string) {
        const checkIn = this.items.find(item => item.id === id)

        if (!checkIn) return null

        return checkIn
    }

    async save(checkIn: CheckIn) {
        const checkInIndex = this.items.findIndex(item => item.id === checkIn.id)

        if (checkInIndex >= 0) {
            this.items[checkInIndex] = checkIn
        }

        return checkIn
    }

}