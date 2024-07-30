/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: false,
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: '/api/:path*',
        },
      ];
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