/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            },
            {
                protocol: 'https',
                hostname: 'gateway.pinata.cloud'
            },
            {
                protocol: 'https',
                hostname: 'kccshop.vn'
            },
            {
                protocol: 'https',
                hostname: 'arweave.net'
            },
        ]
    }
}

module.exports = nextConfig
