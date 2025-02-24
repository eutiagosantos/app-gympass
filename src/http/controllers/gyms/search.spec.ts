import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { createAuthenticateUser } from "@/utils/test/create-authenticate-user";

describe(("Search Gym (e2e)"), () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it(("should be able to search a gym "), async () => {
        const token = await createAuthenticateUser(app, true)

        await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Gym",
                description: "description",
                phone: "31999999999",
                latitude: -19.7958636,
                longitude: -43.9772005
            })

        await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "AAA",
                description: "description",
                phone: "31999999939",
                latitude: -19.7948636,
                longitude: -43.9772005
            })

        const response = await request(app.server)
            .get("/gyms/search")
            .query({
                q: "Gym"
            })
            .set("Authorization", `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: "Gym"
            })
        ])

    })
})