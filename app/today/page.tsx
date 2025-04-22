"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle, Calendar as CalendarIcon, Filter, PlusSquare } from "lucide-react";
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
    dueDate: new Date(), // 今天
    tags: [
      { id: "work", name: "工作", color: "blue" },
      { id: "report", name: "報告", color: "purple" },
    ],
    isStarred: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 兩天前
  },
  {
    id: "task2",
    title: "準備週會簡報",
    description: "整理過去一週的工作進度和下週計劃",
    completed: false,
    priority: "medium",
    dueDate: new Date(), // 今天
    tags: [
      { id: "work", name: "工作", color: "blue" },
      { id: "meeting", name: "會議", color: "green" },
    ],
    isStarred: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 一天前
  },
  {
    id: "task3",
    title: "回覆客戶郵件",
    description: "回覆ABC公司關於新產品功能的諮詢",
    completed: false,
    priority: "high",
    dueDate: new Date(), // 今天
    tags: [
      { id: "work", name: "工作", color: "blue" },
      { id: "client", name: "客戶", color: "red" },
    ],
    isStarred: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 三天前
  },
  {
    id: "task4",
    title: "檢視和核准設計稿",
    description: "查看設計團隊提交的新網站設計草案",
    completed: false,
    priority: "urgent",
    dueDate: new Date(), // 今天
    tags: [
      { id: "work", name: "工作", color: "blue" },
      { id: "design", name: "設計", color: "pink" },
    ],
    isStarred: true,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 四天前
  },
];

export default function TodayPage() {
  const [tasks, setTasks] = useState<Todo[]>(mockTasks);
  const today = new Date();
  const formattedDate = today.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  // 計算今日任務完成度
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // 處理任務狀態變更
  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const handleToggleStar = (id: string) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, isStarred: !task.isStarred } : task)));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (updatedTask: Todo) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">今日任務</h1>
        <p className="text-sm text-gray-600 mt-1">{formattedDate}</p>
      </div>

      {/* 進度摘要卡片 */}
      <div className="bg-white rounded-lg shadow p-5 mb-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">今日進度</h2>
          <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {completedTasks} / {totalTasks} 已完成
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-500">目標：完成所有今日任務</span>
          <span className="text-xs font-medium text-gray-700">{completionPercentage}%</span>
        </div>
      </div>

      {/* 任務列表 */}
      <div className="bg-white rounded-lg shadow border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">待完成任務</h2>
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
          {tasks.length === 0 ? (
            <div className="text-center py-8">
              <div className="mb-4">
                <CheckCircle size={48} className="mx-auto text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">今日沒有任何任務</h3>
              <p className="text-gray-500 mb-4">享受您的閒暇時光，或新增任務來提高生產力</p>
              <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors">
                <PlusSquare size={16} className="mr-2" />
                新增任務
              </button>
            </div>
          ) : (
            <TodoList todos={tasks} title="今日待辦事項" emptyMessage="今日尚無任務" />
          )}
        </div>
      </div>
    </>
  );
}
