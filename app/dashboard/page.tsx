"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronRight, BarChart2, Clock, AlertTriangle } from "lucide-react";
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
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 明天
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
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 三天後
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
    completed: true,
    priority: "high",
    dueDate: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12小時前
    tags: [
      { id: "work", name: "工作", color: "blue" },
      { id: "client", name: "客戶", color: "red" },
    ],
    isStarred: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 三天前
    updatedAt: new Date(), // 現在
  },
  {
    id: "task4",
    title: "檢視和核准設計稿",
    description: "查看設計團隊提交的新網站設計草案",
    completed: false,
    priority: "urgent",
    dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // 昨天
    tags: [
      { id: "work", name: "工作", color: "blue" },
      { id: "design", name: "設計", color: "pink" },
    ],
    isStarred: true,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 四天前
  },
  {
    id: "task5",
    title: "安排團隊建設活動",
    description: "為團隊計劃下個月的建設活動，預訂場地和安排活動",
    completed: false,
    priority: "low",
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14天後
    tags: [
      { id: "work", name: "工作", color: "blue" },
      { id: "team", name: "團隊", color: "cyan" },
    ],
    isStarred: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 一天前
  },
];

export default function Dashboard() {
  const [tasks, setTasks] = useState<Todo[]>(mockTasks);

  // 任務統計
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const todayTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate.getDate() === today.getDate() && dueDate.getMonth() === today.getMonth() && dueDate.getFullYear() === today.getFullYear();
  }).length;
  const overdueTasks = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date();
  }).length;
  const upcomingTasks = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) > new Date();
  }).length;

  // 優先級分佈
  const priorityDistribution = tasks.reduce(
    (acc, task) => {
      acc[task.priority]++;
      return acc;
    },
    { low: 0, medium: 0, high: 0, urgent: 0 }
  );

  // 獲取今天到期的任務
  const todayTasksList = tasks.filter(task => {
    if (!task.dueDate) return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate.getDate() === today.getDate() && dueDate.getMonth() === today.getMonth() && dueDate.getFullYear() === today.getFullYear() && !task.completed;
  });

  // 獲取重要任務
  const importantTasks = tasks.filter(task => task.isStarred && !task.completed);

  // 獲取逾期任務
  const overdueTasksList = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date();
  });

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">儀表板</h1>
        <p className="text-sm text-gray-600 mt-1">查看您的任務概覽和效率統計</p>
      </div>

      {/* 統計卡片區域 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }} className="bg-white rounded-lg shadow p-5 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">總任務</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{totalTasks}</h3>
              <p className="text-xs text-gray-500 mt-1">
                已完成: {completedTasks} ({Math.round((completedTasks / totalTasks) * 100) || 0}%)
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <BarChart2 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
            <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${(completedTasks / totalTasks) * 100}%` }}></div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }} className="bg-white rounded-lg shadow p-5 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">今日任務</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{todayTasks}</h3>
              <p className="text-xs text-gray-500 mt-1">{todayTasks > 0 ? "需要關注" : "無截止任務"}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <Link href="/today" className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center">
              查看今日任務 <ChevronRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }} className="bg-white rounded-lg shadow p-5 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">已計劃任務</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{upcomingTasks}</h3>
              <p className="text-xs text-gray-500 mt-1">未來安排</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <Link href="/planned" className="text-xs text-green-600 hover:text-green-800 font-medium flex items-center">
              查看計劃任務 <ChevronRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }} className="bg-white rounded-lg shadow p-5 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">逾期任務</p>
              <h3 className="text-3xl font-bold text-red-500 mt-1">{overdueTasks}</h3>
              <p className="text-xs text-gray-500 mt-1">{overdueTasks > 0 ? "需要立即處理" : "沒有逾期任務"}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            {overdueTasks > 0 && (
              <button className="text-xs text-red-600 hover:text-red-800 font-medium flex items-center">
                處理逾期任務 <ChevronRight className="h-3 w-3 ml-1" />
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* 優先級分佈 */}
      <div className="bg-white rounded-lg shadow mb-6 border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">任務優先級分佈</h2>
        </div>
        <div className="p-5">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">低優先級</span>
                <span className="text-xs font-medium text-gray-700">{priorityDistribution.low}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(priorityDistribution.low / totalTasks) * 100}%` }}></div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">中優先級</span>
                <span className="text-xs font-medium text-gray-700">{priorityDistribution.medium}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(priorityDistribution.medium / totalTasks) * 100}%` }}></div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">高優先級</span>
                <span className="text-xs font-medium text-gray-700">{priorityDistribution.high}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(priorityDistribution.high / totalTasks) * 100}%` }}></div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">緊急</span>
                <span className="text-xs font-medium text-gray-700">{priorityDistribution.urgent}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(priorityDistribution.urgent / totalTasks) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 任務區塊 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 今日任務 */}
        <div className="bg-white rounded-lg shadow border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">今日任務</h2>
            <Link href="/today" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
              查看全部 <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="p-5">
            <TodoList todos={todayTasksList} emptyMessage="今天沒有截止的任務" />
          </div>
        </div>

        {/* 重要任務 */}
        <div className="bg-white rounded-lg shadow border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">重要任務</h2>
            <Link href="/important" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
              查看全部 <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="p-5">
            <TodoList todos={importantTasks} emptyMessage="沒有已標記重要的任務" />
          </div>
        </div>

        {/* 逾期任務 */}
        {overdueTasks > 0 && (
          <div className="bg-white rounded-lg shadow border border-gray-100 lg:col-span-2">
            <div className="p-5 border-b border-red-100 bg-red-50 flex justify-between items-center">
              <h2 className="text-lg font-medium text-red-700">逾期任務</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">需優先處理</span>
            </div>
            <div className="p-5">
              <TodoList todos={overdueTasksList} emptyMessage="沒有逾期的任務" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
