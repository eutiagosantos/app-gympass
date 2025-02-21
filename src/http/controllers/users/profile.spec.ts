import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { any } from "zod";

describe(("Profile (e2e)"), () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it(("should be able to get a user profile "), async () => {
        await request(app.server)
            .post("/users")
            .send({
                name: "Tiago",
                email: "tiago@gmail.com",
                password: "123456",
            })

        const authResponse = await request(app.server)
            .post("/sessions")
            .send({
                email: "tiago@gmail.com",
                password: "123456",
            })

        const { token } = authResponse.body

        const profileResponse = await request(app.server)
            .post("/profile")
            .set("Authorization", `Bearer ${token}`)
            .send()

        expect(profileResponse.statusCode).toEqual(200)
        expect(profileResponse.body.user).toEqual(expect.objectContaining({
            email: "tiago@gmail.com",
        }))
    })
})