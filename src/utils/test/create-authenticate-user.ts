import { prisma } from "@/database/prisma";
import { FastifyInstance } from "fastify";
import { hash } from "bcryptjs";
import request from 'supertest'

export async function createAuthenticateUser(
    app: FastifyInstance,
    isAdmin = false,
) {
    await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john@doe.com',
            password_hash: await hash('123456', 6),

        },
    })

    const authResponse = await request(app.server).post('/sessions').send({
        email: 'john@doe.com',
        password: '123456',
    })

    const { token } = authResponse.body

    return { token }
}