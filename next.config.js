module.exports = {
  images: {
    domains: ['content.endangeredlanguagealliance.org', 'ealliance.org'],
  },
  target: 'serverless', // Netlify plugin might handle it, but had problems
  publicRuntimeConfig: {
    REACT_APP_MB_TOKEN: process.env.REACT_APP_MB_TOKEN,
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
