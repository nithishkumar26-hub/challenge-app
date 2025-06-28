const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Force Metro to use port 8081
config.server = {
  port: 8081,
};

module.exports = config;