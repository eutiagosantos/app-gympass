import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        environment: './prisma/vitest-environment-prisma/prisma-environment-test.ts', // Required
        environmentOptions: {
            adapter: 'psql',
            envFile: '.env.test',
        },
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
