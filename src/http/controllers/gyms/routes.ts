import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createGym } from "./create";
import { searchGym } from "./search";
import { nearbyGyms } from "./nearby-";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";


export async function gymRoutes(app: FastifyInstance) {

    app.addHook('onRequest', verifyJwt)

    app.post("/gyms", { onRequest: [verifyUserRole('ADMIN')] }, createGym)
    app.get("gyms/search", searchGym)
    app.get("gyms/nearby", nearbyGyms)
}