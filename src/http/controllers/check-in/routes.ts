import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createCheckIn } from "./create";
import { historyCheckIn } from "./history";
import { validateCheckIn } from "./validate";
import { metricsCheckIn } from "./metrics";


export function checkInRoutes(app: FastifyInstance) {

    app.addHook('onRequest', verifyJwt)

    app.get('/check-in/history', historyCheckIn)
    app.get('/check-in/metrics', metricsCheckIn)

    app.patch('/check-ins/:checkInId/validate', validateCheckIn)
    app.post('/gyms/:gymId/checkin', createCheckIn)
}