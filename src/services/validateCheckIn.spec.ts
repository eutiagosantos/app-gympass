import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { ValidateCheckInService } from "./validateCheckInService";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";

let checkInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInService
describe('Validate Check in use case', () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new ValidateCheckInService(checkInRepository)
        //vi.useFakeTimers()

    })

    afterEach(() => {
        //vi.useRealTimers()
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
        await expect(() => {
            sut.execute({
                id: 'inexist-check-in'
            })
        }).rejects.toBeInstanceOf(ResourceNotFoundError)

    })

})