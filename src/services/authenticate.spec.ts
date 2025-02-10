import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { AuthenticateUserService } from "./authenticateService"
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from './errors/InvalidCredentialsError';

let userRepository: InMemoryUserRepository
let sut: AuthenticateUserService

describe('Register use case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new AuthenticateUserService(userRepository)
    })

    it('should be able to register', async () => {

        await userRepository.create({
            name: "tiago",
            email: "tiagoalmeidasantos1812@gmial.com",
            password_hash: await hash("123456", 6)
        })

        const { user } = await sut.execute({
            email: "tiagoalmeidasantos1812@gmial.com",
            password: "123456"
        })


        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able authenticate with a wrong email', async () => {

        expect(() => sut.execute({
            email: "tiagoalmeidasantos1812@gmial.com",
            password: "123456"
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able authenticate with a wrong password', async () => {

        await userRepository.create({
            name: "tiago",
            email: "tiagoalmeidasantos1812@gmial.com",
            password_hash: await hash("123456", 6)
        })

        expect(() => sut.execute({
            email: "tiagoalmeidasantos1812@gmial.com",
            password: "123123"
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})