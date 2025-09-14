import {
  supabase,
  testDatabaseConnection,
  getCurrentEnvironment,
} from "./supabase";
import {
  User,
  Question,
  StudySession,
  UserAnswer,
  UserProgress,
} from "@/types";

/**
 * Centralized service for all Supabase operations
 * Provides a clean interface for database operations with error handling
 */
export class SupabaseService {
  /**
   * Test the database connection
   */
  static async testConnection(): Promise<{
    success: boolean;
    environment: string;
    error?: string;
  }> {
    try {
      const isConnected = await testDatabaseConnection();
      const environment = getCurrentEnvironment();

      return {
        success: isConnected,
        environment,
        error: isConnected ? undefined : "Failed to connect to database",
      };
    } catch (error) {
      return {
        success: false,
        environment: getCurrentEnvironment(),
        error:
          error instanceof Error ? error.message : "Unknown connection error",
      };
    }
  }

  /**
   * Get current user profile
   */
  static async getCurrentUser(): Promise<User | null> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return null;

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  /**
   * Get questions by part type
   */
  static async getQuestions(
    partType: "part5" | "part6" | "part7",
    limit: number = 10,
    difficulty?: "easy" | "medium" | "hard"
  ): Promise<Question[]> {
    try {
      let query = supabase
        .from("questions")
        .select("*")
        .eq("part_type", partType)
        .eq("is_active", true)
        .limit(limit);

      if (difficulty) {
        query = query.eq("difficulty", difficulty);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching questions:", error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error getting questions:", error);
      return [];
    }
  }

  /**
   * Create a new study session
   */
  static async createStudySession(
    userId: string,
    partType: "part5" | "part6" | "part7",
    totalQuestions: number
  ): Promise<StudySession | null> {
    try {
      const { data, error } = await supabase
        .from("study_sessions")
        .insert({
          user_id: userId,
          part_type: partType,
          start_time: new Date().toISOString(),
          total_questions: totalQuestions,
          completed: false,
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating study session:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error creating study session:", error);
      return null;
    }
  }

  /**
   * Submit an answer for a question
   */
  static async submitAnswer(
    sessionId: string,
    questionId: string,
    userAnswer: string,
    isCorrect: boolean,
    timeTaken?: number
  ): Promise<UserAnswer | null> {
    try {
      const { data, error } = await supabase
        .from("user_answers")
        .insert({
          session_id: sessionId,
          question_id: questionId,
          user_answer: userAnswer,
          is_correct: isCorrect,
          time_taken: timeTaken,
          answered_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error("Error submitting answer:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error submitting answer:", error);
      return null;
    }
  }

  /**
   * Complete a study session
   */
  static async completeStudySession(
    sessionId: string,
    score: number
  ): Promise<StudySession | null> {
    try {
      const { data, error } = await supabase
        .from("study_sessions")
        .update({
          end_time: new Date().toISOString(),
          score: score,
          completed: true,
        })
        .eq("id", sessionId)
        .select()
        .single();

      if (error) {
        console.error("Error completing study session:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error completing study session:", error);
      return null;
    }
  }

  /**
   * Get user's recent study sessions
   */
  static async getRecentSessions(
    userId: string,
    limit: number = 10
  ): Promise<StudySession[]> {
    try {
      const { data, error } = await supabase
        .from("study_sessions")
        .select("*")
        .eq("user_id", userId)
        .eq("completed", true)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) {
        console.error("Error fetching recent sessions:", error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error getting recent sessions:", error);
      return [];
    }
  }

  /**
   * Update user progress for a specific date and part
   */
  static async updateUserProgress(
    userId: string,
    date: string,
    partType: "part5" | "part6" | "part7",
    questionsAnswered: number,
    correctAnswers: number,
    totalTime: number
  ): Promise<UserProgress | null> {
    try {
      const { data, error } = await supabase
        .from("user_progress")
        .upsert({
          user_id: userId,
          date: date,
          part_type: partType,
          questions_answered: questionsAnswered,
          correct_answers: correctAnswers,
          total_time: totalTime,
        })
        .select()
        .single();

      if (error) {
        console.error("Error updating user progress:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error updating user progress:", error);
      return null;
    }
  }

  /**
   * Get user progress for a date range
   */
  static async getUserProgress(
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<UserProgress[]> {
    try {
      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", userId)
        .gte("date", startDate)
        .lte("date", endDate)
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching user progress:", error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error getting user progress:", error);
      return [];
    }
  }

  /**
   * Update user profile
   */
  static async updateUserProfile(
    userId: string,
    updates: Partial<Omit<User, "id" | "created_at" | "updated_at">>
  ): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", userId)
        .select()
        .single();

      if (error) {
        console.error("Error updating user profile:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      return null;
    }
  }

  /**
   * Get database health status
   */
  static async getHealthStatus(): Promise<{
    database: boolean;
    auth: boolean;
    environment: string;
  }> {
    const environment = getCurrentEnvironment();

    // Test database connection
    const dbTest = await testDatabaseConnection();

    // Test auth service
    let authTest = false;
    try {
      const { data } = await supabase.auth.getSession();
      authTest = true; // If no error, auth service is working
    } catch (error) {
      console.error("Auth service test failed:", error);
    }

    return {
      database: dbTest,
      auth: authTest,
      environment,
    };
  }
}
