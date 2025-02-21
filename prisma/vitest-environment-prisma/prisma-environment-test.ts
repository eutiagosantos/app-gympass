import { Environment } from "vitest";
import "dotenv"
import { randomUUID } from "node:crypto";
import { URL } from "node:url";
import { execSync } from "node:child_process"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error("Please provide a DATABASE URL environment variable")
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set('schema', schema)

    return url.toString()
}


export default <Environment><unknown>{
    name: 'prisma',

    async setup() {
        const schema = randomUUID()
        const databaseUrl = generateDatabaseURL(schema)

        process.env.DATABASE_URL = databaseUrl
        execSync('npx prisma migrate deploy')

        return {
            async teardown() {
                await prisma.$executeRawUnsafe(
                    `DROPT SCHEMA IF EXISTS "${databaseUrl} CASCADE" `
                )

                await prisma.$disconnect()
            },
        };
    },
}