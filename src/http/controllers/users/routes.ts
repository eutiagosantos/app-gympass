import { FastifyInstance } from "fastify";
import { register } from "./register-controller";
import { authenticate } from "./authenticate-controller";
import { profile } from "./profile-controller";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export async function userRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/sessions', authenticate)

    app.get("/profile", { onRequest: [verifyJwt] }, profile)
}