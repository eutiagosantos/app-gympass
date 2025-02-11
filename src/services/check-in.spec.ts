import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { CheckInService } from "./checkInService"
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from "@prisma/client/runtime/library";

let checkInRepository: InMemoryCheckInRepository
let gymRepository: InMemoryGymRepository
let sut: CheckInService
describe('Register use case', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        gymRepository = new InMemoryGymRepository()
        sut = new CheckInService(checkInRepository, gymRepository)
        vi.useFakeTimers()

        gymRepository.items.push({
            id: 'gym-1',
            title: 'Gym 123',
            description: '',
            phone: '',
            latitude: new Decimal(0),
            longitude: new Decimal(0),
        })

    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {

        const { checkIn } = await sut.execute({
            user_id: 'user-1',
            gym_id: 'gym-1',
            latitude: 0,
            longitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not  be able to check in two times in one day', async () => {
        vi.setSystemTime(new Date(2025, 0, 18, 14, 0, 0))

        const { checkIn } = await sut.execute({
            user_id: 'user-1',
            gym_id: 'gym-1',
            latitude: 0,
            longitude: 0
        })

        await expect(() => sut.execute({
            user_id: 'user-1',
            gym_id: 'gym-1',
            latitude: 0,
            longitude: 0
        }),
        ).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check in two times in differents days', async () => {
        vi.setSystemTime(new Date(2025, 0, 18, 14, 0, 0))

        await sut.execute({
            user_id: 'user-1',
            gym_id: 'gym-1',
            latitude: 0,
            longitude: 0
        })

        vi.setSystemTime(new Date(2025, 0, 19, 14, 0, 0))

        const { checkIn } = await sut.execute({
            user_id: 'user-1',
            gym_id: 'gym-1',
            latitude: 0,
            longitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })
})