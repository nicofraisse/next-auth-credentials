const path = require("path");

module.exports = {
  webpack: (config, options) => {
    config.resolve.alias["components"] = path.join(__dirname, "components");
    config.resolve.alias["context"] = path.join(__dirname, "context");
    config.resolve.alias["data"] = path.join(__dirname, "data");
    config.resolve.alias["lib"] = path.join(__dirname, "lib");
    config.resolve.alias["styles"] = path.join(__dirname, "styles");
    config.resolve.alias["middleware"] = path.join(__dirname, "middleware");
    config.module.rules.push({
      include: [options.dir],
      exclude: /node_modules/,
    });

    return config;
  },
  images: {
    domains: ["platform-lookaside.fbsbx.com", "lh3.googleusercontent.com"],
  },
  env: {
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_UPLOAD_PRESET: process.env.CLOUD_UPLOAD_PRESET,
    MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
  },
};
