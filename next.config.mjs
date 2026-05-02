import createNextIntlPlugin from 'next-intl/plugin';

const nextIntlPlugin = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {output: 'standalone'};

export default nextIntlPlugin(nextConfig);