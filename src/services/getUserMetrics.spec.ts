import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository"
import { GetUserMetricsService } from "./getUserMetricsService"
import { describe, beforeEach, it, expect } from "vitest"


let checkInRepository: InMemoryCheckInRepository
let sut: GetUserMetricsService

describe('Get user metrics use case', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new GetUserMetricsService(checkInRepository)
    })

    it('should be able to get check-ins count for metrics', async () => {

        await checkInRepository.create({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        await checkInRepository.create({
            gymId: 'gym-02',
            userId: 'user-01'
        })

        const { count } = await sut.execute({
            userId: 'user-01',
        })

        expect(count).toEqual(2)

    })

})