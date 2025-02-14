import { describe, beforeEach, it, expect } from "vitest"
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { Decimal } from "@prisma/client/runtime/library"
import { FetchNearByGym } from "./fetchNearByGymService"


let gymRepository: InMemoryGymRepository
let sut: FetchNearByGym

describe('Fetch near by gym use case', () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymRepository()
        sut = new FetchNearByGym(gymRepository)
    })

    it('should be able to fetch near gym', async () => {
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
            latitude: new Decimal(-19.6513412),
            longitude: new Decimal(-44.0186071)
        })

        const { gyms } = await sut.execute({
            userLatitude: -19.9163904,
            userLongitude: -43.9681024
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({ title: 'Test Gym' }),])
    })
})