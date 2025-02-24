import { makeCheckInUseCase } from "@/services/factories/makeCheckInUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'


export async function createCheckIn(request: FastifyRequest, reply: FastifyReply) {

    const gymIdParam = z.object({
        gymId: z.string().uuid(),
    })

    const createCheckInBodySchema = z.object({
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        })
    })

    const { latitude, longitude } = createCheckInBodySchema.parse(request.body)
    const { gymId } = gymIdParam.parse(request.params)


    const createCheckInService = makeCheckInUseCase()

    await createCheckInService.execute({
        gym_id: gymId,
        user_id: request.user.sub,
        userLatitude: latitude,
        userLongitude: longitude
    })


    return reply.status(201).send()

}