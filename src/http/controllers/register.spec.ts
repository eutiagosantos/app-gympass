import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest"
import { app } from "@/app";

describe(("Register (e2e)"), () => {
    beforeAll(() => {
        app.ready()
    })

    afterAll(() => {
        app.close()
    })

    it(("should be able to Register "), async () => {
        const response = (await request(app.server)
            .post("/users")
            .send({
                name: "Tiago",
                email: "tiago@gmail.com",
                password: "123456",
            }))

        expect(response.statusCode).toEqual(201)
    })
})