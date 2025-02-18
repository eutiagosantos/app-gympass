import { prisma } from '@/database/prisma';
import { CheckInRepository } from '@/repositories/check-in-repository';
import { Prisma, CheckIn } from '@prisma/client';
import dayjs from 'dayjs';


export class PrismaCheckInRepository implements CheckInRepository {
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = await prisma.checkIn.create({
            data,
        })

        return checkIn
    }
    async save(checkIn: CheckIn) {
        const checkInUpdate = await prisma.checkIn.update({
            where: {
                id: checkIn.id,
            },
            data: checkIn,
        })

        return checkInUpdate
    }

    async findById(id: string) {
        const checkIn = await prisma.checkIn.findUnique({
            where: {
                id: id,
            },
        })

        return checkIn
    }
    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkIn = await prisma.checkIn.findFirst({
            where: {
                userId: userId,
                created_at: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate()
                }
            }
        })

        return checkIn
    }
    async findManyByUserId(userId: string, page: number) {
        const checkIns = await prisma.checkIn.findMany({
            where: {
                id: userId,
            },
            take: 20,
            skip: (page - 1) * 20
        })
        return checkIns
    }
    async getUserMetrics(user_id: string) {
        const count = await prisma.checkIn.count({
            where: {
                userId: user_id
            }
        })

        return count
    }

}