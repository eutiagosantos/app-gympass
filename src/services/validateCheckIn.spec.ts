import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { ValidateCheckInService } from "./validateCheckInService";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";
import { LateCheckInValidationError } from "./errors/LateCheckInValidationError";

let checkInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInService
describe('Validate Check in use case', () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new ValidateCheckInService(checkInRepository)
        vi.useFakeTimers()

    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('it should be able to validate the check-in', async () => {
        const createdCheckIn = await checkInRepository.create({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        const { checkIn } = await sut.execute({
            id: createdCheckIn.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))

    })


    it('it should not be able to validate an inexist check-in', async () => {
        await expect(() =>
            sut.execute({
                id: 'inexist-check-in'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)

    })


    it('it should not be able to validate the check-in after 20 minutes', async () => {

        vi.setSystemTime(new Date(2025, 0, 1, 13, 40))

        const createdCheckIn = await checkInRepository.create({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        const twentyOneMinutesInMs = 1000 * 60 * 21

        vi.advanceTimersByTime(twentyOneMinutesInMs)

        await expect(() =>
            sut.execute({
                id: createdCheckIn.id
            })
        ).rejects.toBeInstanceOf(LateCheckInValidationError)

    })

})