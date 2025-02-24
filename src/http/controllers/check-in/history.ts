import { makeFetchNearByCheckInUseCase } from "@/services/factories/makeFetchNearbyCheckInUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";



export async function historyCheckIn(request: FastifyRequest, reply: FastifyReply) {

    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { page } = checkInHistoryQuerySchema.parse(request.params)

    const historyCheckInService = makeFetchNearByCheckInUseCase()

    const { checkIns } = await historyCheckInService.execute({
        user_id: request.user.sub,
        page
    })

    return reply.status(200).send({
        checkIns,
    })
}