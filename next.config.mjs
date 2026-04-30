import createNextIntlPlugin from 'next-intl/plugin';
import { webpack } from 'next/dist/compiled/webpack/webpack';
import { config } from 'node:process';

const nextIntlPlugin = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {}

export default nextIntlPlugin(nextConfig);