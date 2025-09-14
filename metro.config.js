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

// Reduce the number of files being watched
config.watchFolders = [];

module.exports = config;
