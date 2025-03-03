import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { any } from "zod";
import { createAuthenticateUser } from "@/utils/test/create-authenticate-user";

describe(("Profile (e2e)"), () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it(("should be able to get a user profile "), async () => {
        const token = await createAuthenticateUser(app)

        const profileResponse = await request(app.server)
            .get("/profile")
            .set("Authorization", `Bearer ${token}`)
            .send()

        expect(profileResponse.statusCode).toEqual(200)
        expect(profileResponse.body.user).toEqual(expect.objectContaining({
            email: "tiago@gmail.com",
        }))
    })
})