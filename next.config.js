module.exports = {
  // This doesn't seem to do anything. Set NEXT_IMAGE_ALLOWED_DOMAINS instead:
  // github.com/netlify/netlify-plugin-nextjs/blob/main/docs/image-handling.md
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
  target: 'serverless', // Netlify plugin might handle it, but had problems
  publicRuntimeConfig: {
    mbToken: process.env.MB_TOKEN,
    youTubeKey: process.env.YOUTUBE_KEY,
    wpGqlEndpoint: process.env.WP_API_URL,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })

    return config
  },
  webpackDevMiddleware: (config) => {
    return config
  },
}
