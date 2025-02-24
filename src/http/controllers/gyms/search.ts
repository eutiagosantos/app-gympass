import { makeSearchGymUseCase } from "@/services/factories/maekSearchGymUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'


export async function searchGym(request: FastifyRequest, reply: FastifyReply) {
    const searchGymQuerySchema = z.object({
        q: z.string(),
        page: z.coerce.number().min(1).default(1),
    })

    const { q, page } = searchGymQuerySchema.parse(request.query)


    const searchGymService = makeSearchGymUseCase()

    const { gyms } = await searchGymService.execute({
        query: q,
        page,
    })


    return reply.status(201).send({
        gyms,
    })

}