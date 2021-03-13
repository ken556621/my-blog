const withPWA = require("next-pwa");

// module.exports = withPWA(
//   {
//       target: "serverless",
//       webpack: config => {
//         config.module.rules.push({test:  /\.md$/, use: "raw-loader"})
//         config.module.rules.push({test: /\.yml$/, use: "raw-loader"})
//         return config
//       },
//       serverRuntimeConfig: {
//           FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
//           FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
//           FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
//           FIREBASE_SENDER_ID: process.env.FIREBASE_SENDER_ID,
//           MEASUREMENTID: process.env.MEASUREMENTID,
//           STORAGEBUCKET: process.env.STORAGEBUCKET,
//           AUTHDOMAIN: process.env.AUTHDOMAIN
//       },
//       pwa: {
//         dest: "public"
//       }
//   }
// )

module.exports = {
  target: "serverless",
  webpack: config => {
    config.module.rules.push({ test: /\.md$/, use: "raw-loader" })
    config.module.rules.push({ test: /\.yml$/, use: "raw-loader" })
    return config
  },
  serverRuntimeConfig: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_SENDER_ID: process.env.FIREBASE_SENDER_ID,
    MEASUREMENTID: process.env.MEASUREMENTID,
    STORAGEBUCKET: process.env.STORAGEBUCKET,
    AUTHDOMAIN: process.env.AUTHDOMAIN
  },
  pwa: {
    dest: "public"
  }
}