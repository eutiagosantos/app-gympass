import { makeFetchNearByGymUseCase } from "@/services/factories/makeFetchNearByGymUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'


export async function nearbyGyms(request: FastifyRequest, reply: FastifyReply) {
    const nearByGymsQuerySchema = z.object({
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        })
    })

    const { latitude, longitude } = nearByGymsQuerySchema.parse(request.body)


    const nearByGymService = makeFetchNearByGymUseCase()

    const { gyms } = await nearByGymService.execute({
        userLatitude: latitude,
        userLongitude: longitude
    })


    return reply.status(201).send({
        gyms,
    })

}