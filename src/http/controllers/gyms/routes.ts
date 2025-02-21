import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createGym } from "./create-controller";
import { searchGym } from "./search-controller";
import { nearbyGyms } from "./nearby-controller";


export async function gymRoutes(app: FastifyInstance) {

    app.addHook('onRequest', verifyJwt)

    app.post("/gyms", createGym)
    app.get("gyms/search", searchGym)
    app.get("gyms/nearby", nearbyGyms)
}