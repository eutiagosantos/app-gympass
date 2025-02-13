import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository"
import { FetchUserCheckIns } from "./fetchUserCheckInsService"
import { describe, beforeEach, it, expect } from "vitest"


let checkInRepository: InMemoryCheckInRepository
let sut: FetchUserCheckIns

describe('Fetch user check-ins use case', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new FetchUserCheckIns(checkInRepository)
    })

    it('should be able to fetch check-in history', async () => {
        await checkInRepository.create({
            gymId: 'gym-01',
            userId: 'user-01',
        })

        await checkInRepository.create({
            gymId: 'gym-02',
            userId: 'user-01',
        })

        const { checkIns } = await sut.execute({
            user_id: 'user-01',
            page: 1
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gymId: 'gym-01' }),
            expect.objectContaining({ gymId: 'gym-02' })
        ])
    })


    it('should be able to fetch paginated check-in history', async () => {

        for (let i = 1; i <= 22; i++) {
            await checkInRepository.create({
                gymId: `gym-${i}`,
                userId: 'user-01',
            })
        }

        const { checkIns } = await sut.execute({
            user_id: 'user-01',
            page: 2
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gymId: 'gym-21' }),
            expect.objectContaining({ gymId: 'gym-22' })
        ])

    })
})