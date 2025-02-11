import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { CheckInService } from "./checkInService"

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInService
describe('Register use case', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new CheckInService(checkInRepository)
    })

    it('should be able to check in', async () => {

        const { checkIn } = await sut.execute({
            user_id: 'user-1',
            gym_id: 'gym-1',
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})