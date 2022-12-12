const SentryWebpackPlugin = require('@sentry/webpack-plugin');

module.exports = {
  webpack: {
    plugins: {
      add: [
        new SentryWebpackPlugin({
          org: 'arlenx',
          project: 'yami-market-client',
          include: './build',
          authToken: process.env.SENTRY_AUTH_TOKEN
        })
      ]
    },
    configure: {
      devtool: 'source-map'
    }
  }
};
