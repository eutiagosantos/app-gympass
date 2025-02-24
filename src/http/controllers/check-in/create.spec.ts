import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { createAuthenticateUser } from "@/utils/test/create-authenticate-user";
import { prisma } from "@/database/prisma";

describe(("Create check-in (e2e)"), () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it(("should be able to check-in "), async () => {
        const token = await createAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data: {
                title: "Gym",
                description: "description",
                phone: "31999999999",
                latitude: -19.7958636,
                longitude: -43.9772005
            }
        })

        const response = await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                latitude: -19.7958636,
                longitude: -43.9772005
            })

        expect(response.statusCode).toEqual(200)

    })
})