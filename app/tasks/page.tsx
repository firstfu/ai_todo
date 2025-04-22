"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ListTodo, Star, CheckCircle, Filter, PlusSquare, Inbox, Star as StarIcon } from "lucide-react";
import { Todo, TodoList } from "../components/Todo";
import Link from "next/link";

// 模擬數據 - 在真實應用中會從API中獲取
const mockTasks: Todo[] = [
  {
    id: "task1",
    title: "完成季度銷售報告",
    description: "準備Q3銷售數據分析和增長預測，包含所有產品線",
    completed: false,
    priority: "high",
    dueDate: new Date(),
    tags: [
      { id: "work", name: "工作", color: "blue" },
      { id: "report", name: "報告", color: "purple" },
    ],
    isStarred: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "task2",
    title: "準備週會簡報",
    description: "整理過去一週的工作進度和下週計劃",
    completed: false,
    priority: "medium",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    tags: [
      { id: "work", name: "工作", color: "blue" },
      { id: "meeting", name: "會議", color: "green" },
    ],
    isStarred: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: "task3",
    title: "回覆客戶郵件",
    description: "回覆ABC公司關於新產品功能的諮詢",
    completed: true,
    priority: "high",
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    tags: [
      { id: "work", name: "工作", color: "blue" },
      { id: "client", name: "客戶", color: "red" },
    ],
    isStarred: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "task4",
    title: "檢視和核准設計稿",
    description: "查看設計團隊提交的新網站設計草案",
    completed: false,
    priority: "urgent",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    tags: [
      { id: "work", name: "工作", color: "blue" },
      { id: "design", name: "設計", color: "pink" },
    ],
    isStarred: true,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: "task5",
    title: "更新專案時程表",
    description: "根據最新進度調整專案時程和里程碑",
    completed: true,
    priority: "medium",
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    tags: [
      { id: "work", name: "工作", color: "blue" },
      { id: "planning", name: "規劃", color: "yellow" },
    ],
    isStarred: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
];

type TaskTab = "all" | "important" | "completed";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Todo[]>(mockTasks);
  const [activeTab, setActiveTab] = useState<TaskTab>("all");

  // 任務數據篩選
  const allTasks = tasks;
  const importantTasks = tasks.filter(task => task.isStarred);
  const completedTasks = tasks.filter(task => task.completed);

  // 計算任務完成度
  const totalTasks = tasks.length;
  const completedTasksCount = tasks.filter(task => task.completed).length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasksCount / totalTasks) * 100) : 0;

  // 獲取當前分類的任務
  const getFilteredTasks = () => {
    switch (activeTab) {
      case "important":
        return importantTasks;
      case "completed":
        return completedTasks;
      case "all":
      default:
        return allTasks;
    }
  };

  // 獲取當前分類的標題
  const getTabTitle = () => {
    switch (activeTab) {
      case "important":
        return "重要任務";
      case "completed":
        return "已完成任務";
      case "all":
      default:
        return "所有任務";
    }
  };

  // 獲取當前分類的空資料訊息
  const getEmptyMessage = () => {
    switch (activeTab) {
      case "important":
        return "沒有標記為重要的任務";
      case "completed":
        return "沒有已完成的任務";
      case "all":
      default:
        return "目前沒有任務";
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">任務管理</h1>
        <p className="text-sm text-gray-600 mt-1">管理您的所有任務、重要任務和已完成項目</p>
      </div>

      {/* 任務統計卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }} className="bg-white rounded-lg shadow p-5 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">所有任務</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{allTasks.length}</h3>
              <p className="text-xs text-gray-500 mt-1">完成率: {completionPercentage}%</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Inbox className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }} className="bg-white rounded-lg shadow p-5 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">重要任務</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{importantTasks.length}</h3>
              <p className="text-xs text-gray-500 mt-1">{importantTasks.length > 0 ? "需要優先處理" : "沒有重要任務"}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <StarIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }} className="bg-white rounded-lg shadow p-5 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">已完成任務</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{completedTasks.length}</h3>
              <p className="text-xs text-gray-500 mt-1">{completedTasksCount > 0 ? `完成率: ${completionPercentage}%` : "尚未完成任務"}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* 任務分類標籤 */}
      <div className="bg-white rounded-lg shadow border border-gray-100 mb-6">
        <div className="flex border-b border-gray-100">
          <button
            className={`flex items-center px-6 py-3 text-sm font-medium ${
              activeTab === "all" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600 hover:text-purple-600"
            }`}
            onClick={() => setActiveTab("all")}
          >
            <ListTodo size={16} className="mr-2" />
            所有任務
            <span className="ml-2 bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs">{allTasks.length}</span>
          </button>
          <button
            className={`flex items-center px-6 py-3 text-sm font-medium ${
              activeTab === "important" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600 hover:text-purple-600"
            }`}
            onClick={() => setActiveTab("important")}
          >
            <Star size={16} className="mr-2" />
            重要任務
            <span className="ml-2 bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs">{importantTasks.length}</span>
          </button>
          <button
            className={`flex items-center px-6 py-3 text-sm font-medium ${
              activeTab === "completed" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600 hover:text-purple-600"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            <CheckCircle size={16} className="mr-2" />
            已完成
            <span className="ml-2 bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs">{completedTasks.length}</span>
          </button>
        </div>
      </div>

      {/* 任務列表 */}
      <div className="bg-white rounded-lg shadow border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">{getTabTitle()}</h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors">
              <Filter size={18} />
            </button>
            <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors">
              <PlusSquare size={18} />
            </button>
          </div>
        </div>

        <div className="p-5">
          <TodoList todos={getFilteredTasks()} emptyMessage={getEmptyMessage()} />
        </div>
      </div>
    </>
  );
}
