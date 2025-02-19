import { makeGetProfileUseCase } from "@/services/factories/makeGetProfileUseCase";
import { FastifyReply, FastifyRequest } from "fastify";


export async function profile(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify()

    const getUserProfile = makeGetProfileUseCase()

    const { user } = await getUserProfile.execute({
        userId: request.user.sub,
    })

    return reply.status(200).send({
        user: {
            ...user,
            password_hash: undefined,
        },
    })
}