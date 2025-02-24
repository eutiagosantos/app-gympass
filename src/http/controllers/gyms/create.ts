import { makeGymUseCase } from "@/services/factories/makeGymUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'


export async function createGym(request: FastifyRequest, reply: FastifyReply) {
    const createGymBodySchema = z.object({
        title: z.string(),
        description: z.string(),
        phone: z.string(),
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        })
    })

    const { title, description, phone, latitude, longitude } = createGymBodySchema.parse(request.body)


    const createGymService = makeGymUseCase()

    await createGymService.execute({
        title,
        description,
        phone,
        latitude,
        longitude
    })


    return reply.status(201).send()

}