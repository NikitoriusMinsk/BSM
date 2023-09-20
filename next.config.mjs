import withBundleAnalyzer from '@next/bundle-analyzer'
import { env } from "./src/env.mjs";
/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
    return _withBundleAnalyzer(config);
}

const _withBundleAnalyzer = withBundleAnalyzer({
    enabled: env.ANALYZE === 'true',
})

export default defineNextConfig({
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.thesports.com',
            },
            {
                protocol: 'https',
                hostname: 's3.betting-media.com'
            }
        ]
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/Football',
                permanent: true
            }
        ]
    }
});

