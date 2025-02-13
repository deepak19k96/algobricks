// next.config.js
const path = require('path')

// next.config.js
require('dotenv').config({ path: '.env.production' })

module.exports = {
  env: {
    API_URL: 'online.youngengineers.org'
  },

  // Enable the Webpack 5 if not already enabled (default for newer Next.js versions)
  webpack5: true,
  webpack: (config, { isServer }) => {
    // Handling image files (png, jpg, jpeg, gif, etc.)
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg)$/i,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/images',
          outputPath: 'static/images',
          name: '[name].[hash].[ext]',
          esModule: false
        }
      }
    })

    // Ensure we only do this for the client-side
    if (!isServer) {
      config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    }

    return config
  }
}
