import { FastifyInstance } from "fastify";
import request from 'supertest'

export async function createAuthenticateUser(app: FastifyInstance) {

    await request(app.server)
        .post("/users")
        .send({
            name: "Tiago",
            email: "tiago@gmail.com",
            password: "123456",
        })

    const authResponse = await request(app.server)
        .post("/sessions")
        .send({
            email: "tiago@gmail.com",
            password: "123456",
        })

    const { token } = authResponse.body

    return {
        token,
    }

}