const withPWA = require("next-pwa");

module.exports = withPWA(
  {
      target: "serverless",
      webpack: config => {
        config.module.rules.push({test:  /\.md$/, use: "raw-loader"})
        config.module.rules.push({test: /\.yml$/, use: "raw-loader"})
        return config
      },
      serverRuntimeConfig: {
          // Will only be available on the server side
          FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
          FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
          FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
          FIREBASE_SENDER_ID: process.env.FIREBASE_SENDER_ID,
      },
      pwa: {
        dest: "public",
        runtimeCaching: [
          {
            urlPattern: '/',
            // use NetworkFirst or NetworkOnly if you redirect un-authenticated user to login page
            // use StaleWhileRevalidate if you want to prompt user to reload when new version available
            handler: 'CacheFirst',
            options: {
              // don't change cache name
              cacheName: 'start-url',
              expiration: {
                maxEntries: 1,
                maxAgeSeconds: 24 * 60 * 60 // 24 hours
              }
            }
          },
          {
            urlPattern: /\.(?:js)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-js-assets',
              expiration: {
                maxEntries: 32,
                maxAgeSeconds: 24 * 60 * 60 // 24 hours
              }
            }
          }
        ]
      }
  }
)