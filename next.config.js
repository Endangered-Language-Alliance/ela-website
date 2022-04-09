// @ts-check

/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
  swcMinify: true, // YOLO: https://tinyurl.com/y8loobnn
  // This doesn't seem to do anything. Set NEXT_IMAGE_ALLOWED_DOMAINS instead:
  // github.com/netlify/netlify-plugin-nextjs/blob/main/docs/image-handling.md
  // UPDATE: The Essential Next.js plugin now supports reading image domains
  // from your Next config, so using NEXT_IMAGE_ALLOWED_DOMAINS is now
  // deprecated. Please set images.domains in next.config.js instead, and remove
  // the NEXT_IMAGE_ALLOWED_DOMAINS variable.
  images: {
    domains: [
      'content.endangeredlanguagealliance.org',
      'ealliance.org',
      'netlify.app',
    ],
    // Avoid making Next calculate all the srcset attributes. We only need these
    // three since they are included in WP's optimized images already. Actually
    // Next isn't using those and it's making its own, but in the future
    // consider using <img srcset="stuff..." /> manually via GraphQL query
    // responses rather than making Next do it. Might be faster. Either way, we
    // currently only need these three sizes (which match the smallest 3 that WP
    // sends back) since the widest image (in FeaturedCard) only takes up half
    // the main content space, which has a max width smaller than 1024 anyway.
    deviceSizes: [300, 768, 1024],
  },
  publicRuntimeConfig: {
    mbToken: process.env.MB_TOKEN,
    youTubeKey: process.env.YOUTUBE_KEY,
    wpGqlEndpoint: process.env.WP_API_URL,
    gaTrackingID: process.env.GA_TRACKING_ID,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })

    return config
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore // ridiculous
  webpackDevMiddleware: (config) => {
    return config
  },
}

module.exports = nextConfig
