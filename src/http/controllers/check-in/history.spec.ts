import { app } from "@/app"
import { prisma } from "@/database/prisma"
import { createAuthenticateUser } from "@/utils/test/create-authenticate-user"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from 'supertest'

describe('Check-in History Controller (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to list the history of check-ins', async () => {
        const { token } = await createAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data: {
                title: 'JavaScript Gym',
                description: 'Some description',
                phone: '7799999999',
                latitude: -12.156271,
                longitude: -44.9875447,
            },
        })

        await prisma.checkIn.createMany({
            data: [
                {
                    gymId: gym.id,
                    userId: user.id,
                },
                {
                    gymId: gym.id,
                    userId: user.id,
                },
            ],
        })

        const response = await request(app.server)
            .get('/check-ins/history')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.checkIns).toEqual([
            expect.objectContaining({
                gym_id: gym.id,
                user_id: user.id,
            }),
            expect.objectContaining({
                gym_id: gym.id,
                user_id: user.id,
            }),
        ])
    })
})