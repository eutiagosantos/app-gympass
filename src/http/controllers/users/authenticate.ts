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

        const token = await reply.jwtSign({
            role: user.role,
        },
            {
                sign: {
                    sub: user.id,
                }
            },
        )

        const refreshToken = await reply.jwtSign({
            role: user.role,
        },
            {
                sign: {
                    sub: user.id,
                    expiresIn: '7d' // o usuario so vai perder a authenticaçao se ficar 7 dias sem entrar na aplicacao
                }
            },
        )

        return reply
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true,
            })
            .status(200)
            .send({ token, })
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send()
        }
        return reply.status(500).send()
    }


}