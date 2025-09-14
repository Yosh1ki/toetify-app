// Supabase generated types will be placed here
// Run: supabase gen types typescript --local > src/types/supabase.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      questions: {
        Row: {
          id: string;
          part_type: "part5" | "part6" | "part7";
          content: string;
          options: Json;
          correct_answer: string;
          explanation: string;
          difficulty: "easy" | "medium" | "hard";
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          part_type: "part5" | "part6" | "part7";
          content: string;
          options: Json;
          correct_answer: string;
          explanation: string;
          difficulty?: "easy" | "medium" | "hard";
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          part_type?: "part5" | "part6" | "part7";
          content?: string;
          options?: Json;
          correct_answer?: string;
          explanation?: string;
          difficulty?: "easy" | "medium" | "hard";
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      study_sessions: {
        Row: {
          id: string;
          user_id: string;
          part_type: "part5" | "part6" | "part7";
          start_time: string;
          end_time: string | null;
          score: number | null;
          total_questions: number;
          completed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          part_type: "part5" | "part6" | "part7";
          start_time: string;
          end_time?: string | null;
          score?: number | null;
          total_questions: number;
          completed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          part_type?: "part5" | "part6" | "part7";
          start_time?: string;
          end_time?: string | null;
          score?: number | null;
          total_questions?: number;
          completed?: boolean;
          created_at?: string;
        };
      };
      user_answers: {
        Row: {
          id: string;
          session_id: string;
          question_id: string;
          user_answer: string;
          is_correct: boolean;
          time_taken: number | null;
          answered_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          question_id: string;
          user_answer: string;
          is_correct: boolean;
          time_taken?: number | null;
          answered_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          question_id?: string;
          user_answer?: string;
          is_correct?: boolean;
          time_taken?: number | null;
          answered_at?: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          part_type: "part5" | "part6" | "part7";
          questions_answered: number;
          correct_answers: number;
          total_time: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          part_type: "part5" | "part6" | "part7";
          questions_answered?: number;
          correct_answers?: number;
          total_time?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          part_type?: "part5" | "part6" | "part7";
          questions_answered?: number;
          correct_answers?: number;
          total_time?: number;
          created_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          subscription_type: "free" | "premium";
          notification_time: string;
          notification_enabled: boolean;
          streak_days: number;
          last_study_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          subscription_type?: "free" | "premium";
          notification_time?: string;
          notification_enabled?: boolean;
          streak_days?: number;
          last_study_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          subscription_type?: "free" | "premium";
          notification_time?: string;
          notification_enabled?: boolean;
          streak_days?: number;
          last_study_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      difficulty_level: "easy" | "medium" | "hard";
      part_type: "part5" | "part6" | "part7";
      subscription_type: "free" | "premium";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
