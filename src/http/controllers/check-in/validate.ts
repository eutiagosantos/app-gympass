import { makeValidateCheckInUseCase } from "@/services/factories/makeValidateCheckInUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function validateCheckIn(request: FastifyRequest, reply: FastifyReply) {

    const validateCheckInParamsSchema = z.object({
        checkInId: z.string().uuid(),
    })

    const { checkInId } = validateCheckInParamsSchema.parse(request.params)


    const validateCheckInService = makeValidateCheckInUseCase()

    await validateCheckInService.execute({
        id: checkInId,
    })


    return reply.status(204).send()
}

