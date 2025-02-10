import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { GetProfileService } from "./getProfileService"
import { hash } from "bcryptjs"
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError"

let userRepository: InMemoryUserRepository
let sut: GetProfileService

describe('Register use case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new GetProfileService(userRepository)
    })

    it('should be to get user profile', async () => {

        const createdUser = await userRepository.create({
            name: "tiago",
            email: "tiagoalmeidasantos1812@gmial.com",
            password_hash: await hash("123456", 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        })


        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual('tiago')
    })

    it('should not be able to get user profile with worng id', async () => {

        expect(() => sut.execute({
            userId: 'non-existing-id'
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})