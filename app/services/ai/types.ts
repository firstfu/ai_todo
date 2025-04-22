/**
 * AI 服務層類型定義
 * 此文件定義了 AI 驅動的待辦事項系統中所有相關的類型和接口
 */

import { TodoPriority, TodoTag } from "../../components/Todo";

/**
 * AI 建議來源
 */
export enum AITaskSource {
  USER_INPUT = "user_input", // 用戶直接輸入
  NATURAL_LANGUAGE = "natural_language", // 自然語言處理
  EMAIL = "email", // 郵件分析
  CALENDAR = "calendar", // 日曆同步
  PATTERN_DETECTION = "pattern_detection", // 行為模式檢測
  RECURRING = "recurring", // 週期性任務
  EXTERNAL_SERVICE = "external_service", // 外部服務整合
}

/**
 * AI 信心級別
 */
export enum AIConfidenceLevel {
  LOW = "low", // 低信心：AI 不太確定
  MEDIUM = "medium", // 中等信心：AI 較為確定
  HIGH = "high", // 高信心：AI 非常確定
  VERY_HIGH = "very_high", // 極高信心：AI 極其確定
}

/**
 * AI 任務建議
 */
export interface AITaskSuggestion {
  id: string;
  title: string;
  description?: string;
  suggestedPriority: TodoPriority;
  suggestedDueDate?: Date;
  suggestedTags: TodoTag[];
  source: AITaskSource;
  confidenceLevel: AIConfidenceLevel;
  reasoning: string; // AI 提出此建議的理由
  createdAt: Date;
  // 用戶回應
  isAccepted?: boolean;
  userFeedback?: string;
  modifiedByUser?: boolean;
}

/**
 * 用戶行為模式
 */
export interface UserBehaviorPattern {
  id: string;
  patternType: "completion_time" | "task_preference" | "productivity_period" | "procrastination_pattern";
  description: string;
  confidence: number; // 0-1 之間的信心分數
  supportingData: any; // 支持此模式的相關數據
  detectedAt: Date;
}

/**
 * AI 時間估算
 */
export interface AITimeEstimate {
  taskId: string;
  estimatedMinutes: number;
  confidenceLevel: AIConfidenceLevel;
  reasoningFactors: string[];
}

/**
 * AI 優先級計算結果
 */
export interface AIPriorityScore {
  taskId: string;
  rawScore: number; // 原始計算分數 (0-100)
  normalizedPriority: TodoPriority;
  factorsConsidered: {
    factor: string;
    weight: number;
    contribution: number;
  }[];
}

/**
 * AI 建議反饋
 */
export interface AISuggestionFeedback {
  suggestionId: string;
  wasAccepted: boolean;
  wasModified: boolean;
  originalSuggestion: AITaskSuggestion;
  finalResult?: any; // 最終用戶接受的任務
  explicitFeedback?: string; // 用戶可選的明確反饋
  timestamp: Date;
}

/**
 * AI 系統設置
 */
export interface AISystemSettings {
  enabledFeatures: {
    taskSuggestions: boolean;
    priorityCalculation: boolean;
    timeEstimation: boolean;
    patternDetection: boolean;
    naturalLanguageProcessing: boolean;
  };
  datasourcesAccess: {
    email: boolean;
    calendar: boolean;
    messages: boolean;
    documents: boolean;
  };
  suggestionFrequency: "low" | "medium" | "high";
  aiPersonality: "conservative" | "balanced" | "proactive";
  privacyLevel: "max_privacy" | "balanced" | "max_personalization";
}

/**
 * AI 學習進度
 */
export interface AILearningProgress {
  userModelVersion: number;
  totalSuggestionsMade: number;
  acceptanceRate: number;
  detectedPatterns: number;
  lastModelUpdate: Date;
  personalizedFactors: string[];
}
