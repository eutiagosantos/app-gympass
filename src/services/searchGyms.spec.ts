import { describe, beforeEach, it, expect } from "vitest"
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { SearchGymsService } from "./searchGymsService"
import { Decimal } from "@prisma/client/runtime/library"
import { title } from "process"


let gymRepository: InMemoryGymRepository
let sut: SearchGymsService

describe('Search Gyms use case', () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymRepository()
        sut = new SearchGymsService(gymRepository)
    })

    it('should be able to search gyms', async () => {
        await gymRepository.create({
            title: 'Test Gym',
            description: 'Test',
            phone: '',
            latitude: new Decimal(-19.9163904),
            longitude: new Decimal(-43.9681024)
        })

        await gymRepository.create({
            title: 'Other Gym',
            description: 'Test',
            phone: '',
            latitude: new Decimal(-19.9163904),
            longitude: new Decimal(-43.9681024)
        })

        const { gyms } = await sut.execute({
            query: 'Test Gym',
            page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({ title: 'Test Gym' }),])
    })


    it('should be able to search a multiple gyms', async () => {

        for (let i = 1; i <= 22; i++) {
            await gymRepository.create({
                title: `Test Gym ${i}`,
                description: 'Test',
                phone: '',
                latitude: new Decimal(-19.9163904),
                longitude: new Decimal(-43.9681024)
            })
        }

        const { gyms } = await sut.execute({
            query: 'Test Gym',
            page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Test Gym 21' }),
            expect.objectContaining({ title: 'Test Gym 22' })
        ])

    })
})