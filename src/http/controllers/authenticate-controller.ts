import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { AuthenticateUserService } from '@/services/authenticateService'
import { InvalidCredentialsError } from '@/services/errors/InvalidCredentialsError'
import { makeAuthenticateUseCase } from '@/services/factories/makeAuthenticateUseCase'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'


export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const authenticateService = makeAuthenticateUseCase()

        const { user } = await authenticateService.execute({
            email,
            password,
        })

        const token = reply.jwtSign({},
            {
                sign: {
                    sub: user.id,
                }
            },
        )

        return reply.status(200).send(token)
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send()
        }
        return reply.status(500).send()
    }


}