import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { CheckInService } from "./checkInService"

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInService
describe('Register use case', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new CheckInService(checkInRepository)
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {

        const { checkIn } = await sut.execute({
            user_id: 'user-1',
            gym_id: 'gym-1',
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not  be able to check in two times in one day', async () => {
        vi.setSystemTime(new Date(2025, 0, 18, 14, 0, 0))

        const { checkIn } = await sut.execute({
            user_id: 'user-1',
            gym_id: 'gym-1',
        })

        await expect(() => sut.execute({
            user_id: 'user-1',
            gym_id: 'gym-1',
        }),
        ).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check in two times in differents days', async () => {
        vi.setSystemTime(new Date(2025, 0, 18, 14, 0, 0))

        await sut.execute({
            user_id: 'user-1',
            gym_id: 'gym-1',
        })

        vi.setSystemTime(new Date(2025, 0, 19, 14, 0, 0))

        const { checkIn } = await sut.execute({
            user_id: 'user-1',
            gym_id: 'gym-1',
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })
})