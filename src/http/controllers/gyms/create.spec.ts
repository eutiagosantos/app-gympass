import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { createAuthenticateUser } from "@/utils/test/create-authenticate-user";

describe(("Create Gym (e2e)"), () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it(("should be able to create a gym "), async () => {
        const token = await createAuthenticateUser(app, true)

        const response = await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Gym",
                description: "description",
                phone: "31999999999",
                latitude: -19.7958636,
                longitude: -43.9772005
            })

        expect(response.statusCode).toEqual(200)

    })
})