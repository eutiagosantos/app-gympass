import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })
export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        environment: './prisma/vitest-environment-prisma/prisma-environment-test.ts', // Required
        environmentOptions: {
            adapter: 'psql',
            envFile: '.env.test',
        },
        setupFiles: ['dotenv/config'], // Adiciona suporte ao dotenv nos testes
        workspace: [
            {
                extends: true,
                test: {
                    environment: 'prisma',
                },
            },
        ],
    }
})
