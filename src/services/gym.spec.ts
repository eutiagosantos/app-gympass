import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { GymService } from "./gymService"
import { beforeEach, describe, expect, it } from "vitest"

let sut: GymService
let gymRepository: InMemoryGymRepository

describe('Register use case', () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymRepository()
        sut = new GymService(gymRepository)
    })

    it('should be able to create gym', async () => {
        const { gym } = await sut.execute({
            title: 'Gym A',
            description: 'aa',
            phone: '',
            latitude: -19.7958636,
            longitude: -43.9772005
        })


        expect(gym.id).toEqual(expect.any(String))
    })
})