/**
 * AI 服務接口
 * 定義了 AI 驅動待辦事項系統的所有核心 AI 能力
 */

import { Todo } from "../../components/Todo";
import {
  AITaskSuggestion,
  UserBehaviorPattern,
  AITimeEstimate,
  AIPriorityScore,
  AISuggestionFeedback,
  AISystemSettings,
  AILearningProgress,
  AIConfidenceLevel,
  AITaskSource,
} from "./types";

/**
 * AI 服務接口
 * 定義所有 AI 相關功能
 */
export interface AIService {
  /**
   * 基於用戶當前情境和歷史數據生成任務建議
   */
  generateTaskSuggestions(): Promise<AITaskSuggestion[]>;

  /**
   * 從自然語言描述中提取任務信息
   * @param text 自然語言文本
   */
  extractTaskFromText(text: string): Promise<AITaskSuggestion>;

  /**
   * 基於用戶行為和任務特性計算任務優先級
   * @param taskId 任務ID
   */
  calculateTaskPriority(taskId: string): Promise<AIPriorityScore>;

  /**
   * 批量計算多個任務的優先級並排序
   * @param tasks 任務列表
   */
  prioritizeTasks(tasks: Todo[]): Promise<Todo[]>;

  /**
   * 預估任務完成所需時間
   * @param taskId 任務ID
   */
  estimateTaskTime(taskId: string): Promise<AITimeEstimate>;

  /**
   * 識別並保存用戶行為模式
   * @param newTasksData 新任務數據
   * @param completedTasksData 完成任務數據
   */
  detectBehaviorPatterns(newTasksData: Todo[], completedTasksData: Todo[]): Promise<UserBehaviorPattern[]>;

  /**
   * 提出任務重組或安排建議
   * @param date 目標日期
   */
  suggestTaskReorganization(date: Date): Promise<any>;

  /**
   * 根據用戶日程安排和偏好，建議最佳執行時間
   * @param taskId 任務ID
   */
  suggestBestExecutionTime(taskId: string): Promise<Date[]>;

  /**
   * 接收並處理 AI 建議的用戶反饋
   * @param feedback 反饋信息
   */
  processSuggestionFeedback(feedback: AISuggestionFeedback): Promise<void>;

  /**
   * 更新 AI 系統設置
   * @param settings 新設置
   */
  updateSystemSettings(settings: Partial<AISystemSettings>): Promise<AISystemSettings>;

  /**
   * 獲取 AI 學習進度信息
   */
  getLearningProgress(): Promise<AILearningProgress>;

  /**
   * 基於任務描述自動建議標籤
   * @param taskDescription 任務描述
   */
  suggestTags(taskDescription: string): Promise<string[]>;

  /**
   * 預測任務可能的關聯任務或依賴項
   * @param taskId 任務ID
   */
  predictRelatedTasks(taskId: string): Promise<string[]>;

  /**
   * 獲取 AI 當前設置
   */
  getSystemSettings(): Promise<AISystemSettings>;
}
