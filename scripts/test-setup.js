#!/usr/bin/env node

/**
 * Test script to verify the project setup
 * This script checks if all necessary files and configurations are in place
 */

const fs = require("fs");
const path = require("path");

const requiredFiles = [
  "package.json",
  "app.config.js",
  "tsconfig.json",
  "babel.config.js",
  ".env.development",
  ".env.production",
  ".env.local",
  "docker-compose.yml",
  "supabase/config.toml",
  "src/types/index.ts",
  "src/types/supabase.ts",
  "src/services/supabase.ts",
  "src/services/SupabaseService.ts",
  "src/config/environment.ts",
  "src/components/ConnectionTest.tsx",
  "app/_layout.tsx",
  "app/(tabs)/_layout.tsx",
  "app/(tabs)/index.tsx",
  "app/(auth)/_layout.tsx",
];

const requiredDirectories = [
  "app",
  "app/(tabs)",
  "app/(auth)",
  "src",
  "src/types",
  "src/services",
  "src/config",
  "src/components",
  "assets",
  "assets/images",
  "supabase",
  "volumes",
  "scripts",
];

console.log("🔍 TOEIC Study App - Setup Verification\n");

let allGood = true;

// Check directories
console.log("📁 Checking directories...");
requiredDirectories.forEach((dir) => {
  if (fs.existsSync(dir)) {
    console.log(`  ✅ ${dir}`);
  } else {
    console.log(`  ❌ ${dir} - MISSING`);
    allGood = false;
  }
});

console.log("\n📄 Checking files...");
requiredFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    allGood = false;
  }
});

// Check package.json dependencies
console.log("\n📦 Checking key dependencies...");
try {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const requiredDeps = [
    "@supabase/supabase-js",
    "expo-router",
    "expo-notifications",
    "expo-secure-store",
    "@react-native-async-storage/async-storage",
  ];

  requiredDeps.forEach((dep) => {
    if (packageJson.dependencies[dep]) {
      console.log(`  ✅ ${dep}`);
    } else {
      console.log(`  ❌ ${dep} - MISSING`);
      allGood = false;
    }
  });
} catch (error) {
  console.log("  ❌ Error reading package.json");
  allGood = false;
}

// Check environment files
console.log("\n🔧 Checking environment configuration...");
const envFiles = [".env.development", ".env.production", ".env.local"];
envFiles.forEach((envFile) => {
  try {
    const content = fs.readFileSync(envFile, "utf8");
    if (content.includes("EXPO_PUBLIC_SUPABASE_URL")) {
      console.log(`  ✅ ${envFile} - Contains Supabase URL`);
    } else {
      console.log(`  ⚠️  ${envFile} - Missing Supabase URL`);
    }
  } catch (error) {
    console.log(`  ❌ ${envFile} - Cannot read file`);
    allGood = false;
  }
});

console.log("\n" + "=".repeat(50));

if (allGood) {
  console.log("🎉 Setup verification completed successfully!");
  console.log("\n📋 Next steps:");
  console.log("1. Copy .env.development to .env");
  console.log("2. Start Supabase: supabase start");
  console.log("3. Install dependencies: npm install");
  console.log("4. Start Expo: npm start");
} else {
  console.log("❌ Setup verification failed!");
  console.log("Please check the missing files and directories above.");
  process.exit(1);
}

console.log(
  "\n💡 Tip: Run ./scripts/setup-supabase.sh to set up Supabase automatically"
);
