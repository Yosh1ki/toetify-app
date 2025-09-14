import "dotenv/config";

export default {
  expo: {
    name: "TOEIC Study App",
    slug: "toeic-study-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "toeic-study-app",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.toeicstudy.app",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.toeicstudy.app",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-notifications",
        {
          icon: "./assets/images/notification-icon.png",
          color: "#ffffff",
          sounds: ["./assets/sounds/notification.wav"],
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      appEnv: process.env.EXPO_PUBLIC_APP_ENV || "development",
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
      expoProjectId: process.env.EXPO_PUBLIC_EXPO_PROJECT_ID,
      analyticsEnabled: process.env.EXPO_PUBLIC_ANALYTICS_ENABLED === "true",
      premiumFeaturesEnabled:
        process.env.EXPO_PUBLIC_PREMIUM_FEATURES_ENABLED !== "false",
      offlineModeEnabled:
        process.env.EXPO_PUBLIC_OFFLINE_MODE_ENABLED !== "false",
      enableDevTools: process.env.EXPO_PUBLIC_ENABLE_DEV_TOOLS === "true",
      debugMode: process.env.EXPO_PUBLIC_DEBUG_MODE === "true",
      eas: {
        projectId: process.env.EXPO_PUBLIC_EXPO_PROJECT_ID,
      },
    },
  },
};
