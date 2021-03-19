const withPWA = require("next-pwa");

module.exports = withPWA(
  {
    target: "serverless",
    webpack: config => {
      config.module.rules.push({ test: /\.md$/, use: "raw-loader" })
      config.module.rules.push({ test: /\.yml$/, use: "raw-loader" })
      return config
    },
    pwa: {
      dest: "public"
    }
  }
)