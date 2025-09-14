import Constants from "expo-constants";

export interface AppConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  appEnv: "local" | "development" | "production";
  apiUrl: string;
  expoProjectId?: string;
  analyticsEnabled: boolean;
  premiumFeaturesEnabled: boolean;
  offlineModeEnabled: boolean;
  enableDevTools: boolean;
  debugMode: boolean;
}

/**
 * Get environment configuration based on current environment
 */
export const getEnvironmentConfig = (): AppConfig => {
  const extra = Constants.expoConfig?.extra || {};

  // Get environment variables with fallbacks
  const supabaseUrl =
    extra.supabaseUrl || process.env.EXPO_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey =
    extra.supabaseAnonKey || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";
  const appEnv =
    extra.appEnv || process.env.EXPO_PUBLIC_APP_ENV || "development";
  const apiUrl = extra.apiUrl || process.env.EXPO_PUBLIC_API_URL || supabaseUrl;

  // Validate required environment variables
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing required environment variables. Please ensure EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY are set."
    );
  }

  return {
    supabaseUrl,
    supabaseAnonKey,
    appEnv: appEnv as "local" | "development" | "production",
    apiUrl,
    expoProjectId:
      extra.expoProjectId || process.env.EXPO_PUBLIC_EXPO_PROJECT_ID,
    analyticsEnabled:
      extra.analyticsEnabled === "true" ||
      process.env.EXPO_PUBLIC_ANALYTICS_ENABLED === "true",
    premiumFeaturesEnabled:
      extra.premiumFeaturesEnabled !== "false" &&
      process.env.EXPO_PUBLIC_PREMIUM_FEATURES_ENABLED !== "false",
    offlineModeEnabled:
      extra.offlineModeEnabled !== "false" &&
      process.env.EXPO_PUBLIC_OFFLINE_MODE_ENABLED !== "false",
    enableDevTools:
      extra.enableDevTools === "true" ||
      process.env.EXPO_PUBLIC_ENABLE_DEV_TOOLS === "true",
    debugMode:
      extra.debugMode === "true" ||
      process.env.EXPO_PUBLIC_DEBUG_MODE === "true",
  };
};

/**
 * Check if we're running in local development environment
 */
export const isLocalEnvironment = (): boolean => {
  const config = getEnvironmentConfig();
  return (
    config.appEnv === "local" ||
    config.supabaseUrl.includes("localhost") ||
    config.supabaseUrl.includes("127.0.0.1")
  );
};

/**
 * Check if we're running in production environment
 */
export const isProductionEnvironment = (): boolean => {
  const config = getEnvironmentConfig();
  return config.appEnv === "production";
};

/**
 * Check if we're running in development environment
 */
export const isDevelopmentEnvironment = (): boolean => {
  const config = getEnvironmentConfig();
  return config.appEnv === "development";
};

/**
 * Get current environment name
 */
export const getCurrentEnvironment = (): string => {
  return getEnvironmentConfig().appEnv;
};

/**
 * Environment-specific logging
 */
export const envLog = (message: string, ...args: any[]) => {
  const config = getEnvironmentConfig();
  if (config.debugMode || config.enableDevTools) {
    console.log(`[${config.appEnv.toUpperCase()}]`, message, ...args);
  }
};

/**
 * Environment-specific error logging
 */
export const envError = (message: string, error?: any) => {
  const config = getEnvironmentConfig();
  if (
    config.debugMode ||
    config.enableDevTools ||
    config.appEnv !== "production"
  ) {
    console.error(`[${config.appEnv.toUpperCase()}] ERROR:`, message, error);
  }
};
