// Core type definitions for TOEIC Study App

export type SubscriptionType = "free" | "premium";
export type PartType = "part5" | "part6" | "part7";
export type DifficultyLevel = "easy" | "medium" | "hard";

export interface User {
  id: string;
  email: string;
  subscription_type: SubscriptionType;
  notification_time: string; // HH:MM format
  notification_enabled: boolean;
  streak_days: number;
  last_study_date: string | null; // ISO date string
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  part_type: PartType;
  content: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  difficulty: DifficultyLevel;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StudySession {
  id: string;
  user_id: string;
  part_type: PartType;
  start_time: string; // ISO datetime string
  end_time?: string; // ISO datetime string
  score?: number;
  total_questions: number;
  completed: boolean;
  created_at: string;
}

export interface UserAnswer {
  id: string;
  session_id: string;
  question_id: string;
  user_answer: string;
  is_correct: boolean;
  time_taken?: number; // seconds
  answered_at: string; // ISO datetime string
}

export interface UserProgress {
  id: string;
  user_id: string;
  date: string; // ISO date string
  part_type: PartType;
  questions_answered: number;
  correct_answers: number;
  total_time: number; // seconds
  created_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  total_pages: number;
}

// Study session related types
export interface StudySessionConfig {
  part_type: PartType;
  question_count: number;
  difficulty?: DifficultyLevel;
}

export interface StudyResult {
  session: StudySession;
  answers: UserAnswer[];
  score: number;
  accuracy: number;
  total_time: number;
}

// Progress tracking types
export interface WeeklyStats {
  week_start: string;
  total_sessions: number;
  total_questions: number;
  total_correct: number;
  accuracy: number;
  total_time: number;
  streak_days: number;
}

export interface MonthlyStats {
  month: string;
  total_sessions: number;
  total_questions: number;
  total_correct: number;
  accuracy: number;
  total_time: number;
  part_breakdown: {
    [key in PartType]: {
      sessions: number;
      accuracy: number;
    };
  };
}

// Notification types
export interface NotificationSettings {
  enabled: boolean;
  time: string; // HH:MM format
  daily_reminder: boolean;
  streak_celebration: boolean;
  achievement_alerts: boolean;
}

// Local storage types
export interface CachedData {
  questions: Question[];
  last_updated: string;
  expires_at: string;
}

export interface OfflineAnswer {
  session_id: string;
  question_id: string;
  user_answer: string;
  is_correct: boolean;
  time_taken: number;
  answered_at: string;
  synced: boolean;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Navigation types (for Expo Router)
export interface TabParamList {
  index: undefined;
  study: undefined;
  progress: undefined;
  settings: undefined;
}

export interface AuthParamList {
  login: undefined;
  register: undefined;
  "forgot-password": undefined;
}

// Component prop types
export interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  selectedAnswer?: string;
  showResult?: boolean;
  disabled?: boolean;
}

export interface ProgressCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon?: string;
  color?: string;
}

export interface StudySessionCardProps {
  session: StudySession;
  onPress: () => void;
}

// Hook return types
export interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

export interface UseStudySessionReturn {
  currentSession: StudySession | null;
  questions: Question[];
  currentQuestionIndex: number;
  loading: boolean;
  startSession: (config: StudySessionConfig) => Promise<void>;
  submitAnswer: (answer: string) => Promise<void>;
  completeSession: () => Promise<StudyResult>;
  nextQuestion: () => void;
  previousQuestion: () => void;
}

export interface UseProgressReturn {
  weeklyStats: WeeklyStats | null;
  monthlyStats: MonthlyStats | null;
  recentSessions: StudySession[];
  loading: boolean;
  refreshStats: () => Promise<void>;
}
