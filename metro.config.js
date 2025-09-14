const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add exclusions for directories that shouldn't be watched
config.resolver.blockList = [
  /node_modules\/.*\/node_modules\/.*/,
  /volumes\/.*/,
  /supabase\/logs\/.*/,
  /supabase\/storage\/.*/,
  /supabase\/db\/.*/,
  /\.git\/.*/,
];

// Ensure proper resolution for nested node_modules
config.resolver.nodeModulesPaths = [
  require("path").resolve(__dirname, "node_modules"),
];

// Clear watchFolders to avoid conflicts
config.watchFolders = [];

// Reset cache on start
config.resetCache = true;

module.exports = config;
