module.exports = {
  // This doesn't seem to do anything. Set NEXT_IMAGE_ALLOWED_DOMAINS instead:
  // github.com/netlify/netlify-plugin-nextjs/blob/main/docs/image-handling.md
  images: {
    domains: [
      'content.endangeredlanguagealliance.org',
      'ealliance.org',
      'netlify.app',
    ],
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
