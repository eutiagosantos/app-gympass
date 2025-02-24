import { app } from '@/app'
import { prisma } from '@/database/prisma'
import { createAuthenticateUser } from '@/utils/test/create-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Validate Check-ins Controller (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to validate a check-in', async () => {
        const { token } = await createAuthenticateUser(app, true)
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

        let checkIn = await prisma.checkIn.create({
            data: {
                gymId: gym.id,
                userId: user.id,
            },
        })

        const response = await request(app.server)
            .patch(`/check-ins/${checkIn.id}/validade`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(204)

        checkIn = await prisma.checkIn.findUniqueOrThrow({
            where: {
                id: checkIn.id,
            },
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
    })
})