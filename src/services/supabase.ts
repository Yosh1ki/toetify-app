import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";
import { Database } from "@/types/supabase";

// Get environment variables
const supabaseUrl =
  Constants.expoConfig?.extra?.supabaseUrl ||
  process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  Constants.expoConfig?.extra?.supabaseAnonKey ||
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file."
  );
}

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Automatically refresh the session when it expires
    autoRefreshToken: true,
    // Persist the session in secure storage
    persistSession: true,
    // Detect session in URL for OAuth flows
    detectSessionInUrl: false,
  },
});

// Helper function to check if we're connected to local Supabase
export const isLocalEnvironment = () => {
  return supabaseUrl.includes("localhost") || supabaseUrl.includes("127.0.0.1");
};

// Helper function to get current environment
export const getCurrentEnvironment = () => {
  if (isLocalEnvironment()) {
    return "local";
  }

  const appEnv =
    Constants.expoConfig?.extra?.appEnv || process.env.EXPO_PUBLIC_APP_ENV;
  return appEnv || "development";
};

// Database connection test function
export const testDatabaseConnection = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from("questions")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Database connection test failed:", error);
      return false;
    }

    console.log("Database connection test successful");
    return true;
  } catch (error) {
    console.error("Database connection test error:", error);
    return false;
  }
};

// Auth state change listener setup
export const setupAuthListener = (callback: (session: any) => void) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    console.log("Auth state changed:", event, session?.user?.email);
    callback(session);
  });
};

// Export types for convenience
export type { Database } from "@/types/supabase";
