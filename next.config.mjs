import createNextIntlPlugin from 'next-intl/plugin';

const nextIntlPlugin = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {}

export default nextIntlPlugin(nextConfig);