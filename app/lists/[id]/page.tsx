"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { TodoList, Todo, TodoTag } from "../../components/Todo";
import { motion } from "framer-motion";
import { Tag, Calendar, Users, MoreHorizontal, ChevronRight } from "lucide-react";
import Link from "next/link";

// 自定義清單示例數據
const customLists = {
  work: {
    id: "work",
    name: "工作專案",
    color: "purple",
    description: "所有工作相關的任務和專案追蹤",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    taskCount: 8,
  },
  personal: {
    id: "personal",
    name: "個人計畫",
    color: "blue",
    description: "個人目標和長期計畫追蹤",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    taskCount: 5,
  },
  shopping: {
    id: "shopping",
    name: "購物清單",
    color: "green",
    description: "需要購買的物品清單",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    taskCount: 3,
  },
};

// 模擬任務數據 - 確保每個清單都有一些預設任務
const mockTasks: Record<string, Todo[]> = {
  work: [
    {
      id: "work1",
      title: "完成季度銷售報告",
      description: "準備Q3銷售數據分析和增長預測，包含所有產品線",
      completed: false,
      priority: "high",
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      tags: [
        { id: "work", name: "工作", color: "blue" },
        { id: "report", name: "報告", color: "purple" },
      ],
      isStarred: true,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: "work2",
      title: "準備週會簡報",
      description: "整理過去一週的工作進度和下週計劃",
      completed: false,
      priority: "medium",
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      tags: [
        { id: "work", name: "工作", color: "blue" },
        { id: "meeting", name: "會議", color: "green" },
      ],
      isStarred: false,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "work3",
      title: "與設計團隊討論新產品概念",
      description: "探討產品外觀和功能特性",
      completed: false,
      priority: "medium",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      tags: [
        { id: "work", name: "工作", color: "blue" },
        { id: "design", name: "設計", color: "pink" },
      ],
      isStarred: false,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: "work4",
      title: "審核行銷方案草稿",
      description: "檢視社交媒體行銷活動提案",
      completed: true,
      priority: "low",
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      tags: [
        { id: "work", name: "工作", color: "blue" },
        { id: "marketing", name: "行銷", color: "orange" },
      ],
      isStarred: false,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  ],
  personal: [
    {
      id: "personal1",
      title: "安排度假行程",
      description: "預訂住宿和規劃活動行程",
      completed: false,
      priority: "medium",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      tags: [
        { id: "personal", name: "個人", color: "blue" },
        { id: "travel", name: "旅行", color: "cyan" },
      ],
      isStarred: true,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
    {
      id: "personal2",
      title: "閱讀新書籍",
      description: "完成目前閱讀的書籍至少50頁",
      completed: false,
      priority: "low",
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      tags: [
        { id: "personal", name: "個人", color: "blue" },
        { id: "hobby", name: "興趣", color: "orange" },
      ],
      isStarred: false,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: "personal3",
      title: "每日運動計畫",
      description: "至少進行30分鐘有氧運動",
      completed: true,
      priority: "high",
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      tags: [
        { id: "personal", name: "個人", color: "blue" },
        { id: "health", name: "健康", color: "green" },
      ],
      isStarred: false,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  ],
  shopping: [
    {
      id: "shopping1",
      title: "購買週末派對食材",
      description: "蔬菜、水果、飲料和烤肉材料",
      completed: false,
      priority: "medium",
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      tags: [
        { id: "shopping", name: "購物", color: "green" },
        { id: "food", name: "食物", color: "yellow" },
      ],
      isStarred: false,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: "shopping2",
      title: "購買新手機保護殼",
      description: "在購物中心或網上商店尋找",
      completed: false,
      priority: "low",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      tags: [
        { id: "shopping", name: "購物", color: "green" },
        { id: "tech", name: "科技", color: "gray" },
      ],
      isStarred: false,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: "shopping3",
      title: "購買生日禮物",
      description: "為下週的朋友生日準備禮物",
      completed: true,
      priority: "medium",
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      tags: [
        { id: "shopping", name: "購物", color: "green" },
        { id: "gift", name: "禮物", color: "red" },
      ],
      isStarred: false,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  ],
};

export default function CustomListPage() {
  const params = useParams();
  const listId = params.id as string;

  const [list, setList] = useState(customLists[listId as keyof typeof customLists]);
  const [tasks, setTasks] = useState<Todo[]>([]);

  useEffect(() => {
    // 使用預定義的模擬數據而不是動態生成
    if (listId && mockTasks[listId]) {
      setTasks(mockTasks[listId]);
    } else {
      // 如果找不到指定清單的數據，則設置為空數組
      setTasks([]);
    }
  }, [listId]);

  // 如果清單不存在
  if (!list) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">清單不存在</h1>
        <p className="text-gray-600 mb-6">您要尋找的清單不存在或已被移除。</p>
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 flex items-center">
          返回儀表板 <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    );
  }

  // 計算已完成任務的百分比
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  // 按狀態分組的任務
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasksList = tasks.filter(task => task.completed);

  // 檢查是否有逾期任務
  const hasDueTasks = tasks.some(task => task.dueDate && new Date(task.dueDate) < new Date() && !task.completed);

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{list.name}</h1>
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">{list.description}</p>

        <div className="flex items-center mt-4 text-xs text-gray-500 space-x-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>建立於 {list.createdAt.toLocaleDateString("zh-TW")}</span>
          </div>
          <div className="flex items-center">
            <Tag className="h-4 w-4 mr-1" />
            <span>{tasks.length} 個任務</span>
          </div>
        </div>
      </div>

      {/* 進度統計 */}
      <div className="bg-white rounded-lg shadow p-5 mb-6 border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-medium text-gray-900">清單進度</h2>
          <span className="text-sm text-gray-500">
            {completedTasks}/{tasks.length} 已完成
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className={`h-2.5 rounded-full ${completionRate === 100 ? "bg-green-500" : "bg-blue-500"}`} style={{ width: `${completionRate}%` }}></div>
        </div>
      </div>

      {/* 任務區塊 */}
      <div className="space-y-6">
        {/* 待辦任務 */}
        <div className="bg-white rounded-lg shadow border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">待辦任務</h2>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{pendingTasks.length}</span>
          </div>
          <div className="p-5">
            <TodoList todos={pendingTasks} emptyMessage="沒有待辦的任務" />
          </div>
        </div>

        {/* 已完成任務 */}
        {completedTasksList.length > 0 && (
          <div className="bg-white rounded-lg shadow border border-gray-100">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">已完成任務</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {completedTasksList.length}
              </span>
            </div>
            <div className="p-5">
              <TodoList todos={completedTasksList} emptyMessage="沒有已完成的任務" />
            </div>
          </div>
        )}

        {/* 底部操作 */}
        <div className="flex justify-center space-x-4 py-4">
          <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors">新增任務</button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">編輯清單</button>
        </div>
      </div>
    </>
  );
}
