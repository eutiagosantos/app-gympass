import { describe, expect, it } from 'vitest'
import { RegisterService } from './registerService'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError'

describe('Register use case', () => {
    it('should be able to register', async () => {
        const userRepository = new InMemoryUserRepository()
        const registerService = new RegisterService(userRepository)

        const { user } = await registerService.execute({
            name: "Tiago Almeida",
            email: "tiagoalmeidasantos1812@gmial.com",
            password: "123456"
        })


        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const userRepository = new InMemoryUserRepository()
        const registerService = new RegisterService(userRepository)

        const { user } = await registerService.execute({
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
        const userRepository = new InMemoryUserRepository()
        const registerService = new RegisterService(userRepository)

        const email = "user@example.com"

        await registerService.execute({
            name: "Tiago Almeida",
            email,
            password: "123456"
        })

        await expect(() =>
            registerService.execute({
                name: "Tiago Almeida",
                email,
                password: "123456"
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})