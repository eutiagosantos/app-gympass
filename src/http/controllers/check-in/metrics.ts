import { makeGetUserMetricsUseCase } from "@/services/factories/makeGetUserMetricsUseCase";
import { makeValidateCheckInUseCase } from "@/services/factories/makeValidateCheckInUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function metricsCheckIn(request: FastifyRequest, reply: FastifyReply) {

    const getUserMetricsService = makeGetUserMetricsUseCase()

    const { count } = await getUserMetricsService.execute({
        userId: request.user.sub,
    })


    return reply.status(204).send({
        count
    })
}

