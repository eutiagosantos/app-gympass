import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterService } from './registerService'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError'

let sut: RegisterService
let userRepository: InMemoryUserRepository

describe('Register use case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new RegisterService(userRepository)
    })

    it('should be able to register', async () => {
        const { user } = await sut.execute({
            name: "Tiago Almeida",
            email: "tiagoalmeidasantos1812@gmial.com",
            password: "123456"
        })


        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {

        const { user } = await sut.execute({
            name: "Tiago Almeida",
            email: "tiagoalmeidasantos1812@gmial.com",
            password: "123456"
        })

        const isPasswordCorrectlyHashed = await compare(
            "123456",
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {

        const email = "user@example.com"

        await sut.execute({
            name: "Tiago Almeida",
            email,
            password: "123456"
        })

        await expect(() =>
            sut.execute({
                name: "Tiago Almeida",
                email,
                password: "123456"
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})