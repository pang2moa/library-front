import { env } from 'process';

/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: false,
    async rewrites() {
      if (env.NODE_ENV === 'production') {
        return [
          {
            source: '/api/Member/:path*',
            destination: 'http://222.108.42.200:8083/api/Member/:path*',
          },
        ];
      } else {
        return [
          {
            source: '/api/:path*',
            destination: '/api/:path*',
          },
        ];
      }
    },
    webpack(webpackConfig) {
      return {
        ...webpackConfig,
        optimization: {
          minimize: false,
        },
      };
    },
  }
  
  export default nextConfig;