"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { TodoList, Todo, TodoTag } from "../../components/Todo";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Calendar, MoreHorizontal, ChevronRight, X, Plus, Edit as EditIcon, Filter, CheckCircle, ListX } from "lucide-react";
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
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEditListModal, setShowEditListModal] = useState(false);
  const [taskFilter, setTaskFilter] = useState<"all" | "pending" | "completed">("all");

  // 新任務表單狀態
  const [newTask, setNewTask] = useState<{
    title: string;
    description: string;
    priority: "low" | "medium" | "high" | "urgent";
    dueDate: string;
  }>({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  // 編輯清單表單狀態
  const [editedList, setEditedList] = useState<{
    name: string;
    description: string;
    color: string;
  }>({
    name: "",
    description: "",
    color: "purple",
  });

  useEffect(() => {
    // 使用預定義的模擬數據而不是動態生成
    if (listId && mockTasks[listId]) {
      setTasks(mockTasks[listId]);
    } else {
      // 如果找不到指定清單的數據，則設置為空數組
      setTasks([]);
    }
  }, [listId]);

  useEffect(() => {
    // 當 list 變化時，更新編輯清單的初始值
    if (list) {
      setEditedList({
        name: list.name,
        description: list.description,
        color: list.color,
      });
    }
  }, [list]);

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

  // 根據篩選條件過濾任務
  const filteredTasks = (() => {
    switch (taskFilter) {
      case "pending":
        return tasks.filter(task => !task.completed);
      case "completed":
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  })();

  // 檢查是否有逾期任務
  const hasDueTasks = tasks.some(task => task.dueDate && new Date(task.dueDate) < new Date() && !task.completed);

  // 處理任務狀態變更
  const handleTaskChange = (updatedTask: Todo) => {
    setTasks(prev => prev.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  // 處理新增任務提交
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    // 創建新任務
    const newTodoItem: Todo = {
      id: `${listId}${tasks.length + 1}`,
      title: newTask.title,
      description: newTask.description,
      completed: false,
      priority: newTask.priority,
      dueDate: newTask.dueDate ? new Date(newTask.dueDate) : undefined,
      tags: [{ id: listId, name: list.name, color: list.color }],
      isStarred: false,
      createdAt: new Date(),
    };

    // 更新任務列表
    setTasks(prev => [...prev, newTodoItem]);

    // 重置表單並關閉模態框
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    });
    setShowAddTaskModal(false);
  };

  // 處理編輯清單提交
  const handleEditList = (e: React.FormEvent) => {
    e.preventDefault();

    // 更新清單信息
    setList(prev => ({
      ...prev,
      name: editedList.name,
      description: editedList.description,
      color: editedList.color,
    }));

    // 關閉模態框
    setShowEditListModal(false);
  };

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

      {/* 整合的任務列表區塊 */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">任務列表</h2>
            <div className="flex items-center space-x-2">
              {/* 篩選按鈕區 */}
              <div className="flex bg-gray-100 p-1 rounded-md">
                <button
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    taskFilter === "all" ? "bg-white shadow text-gray-800" : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setTaskFilter("all")}
                >
                  全部
                </button>
                <button
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    taskFilter === "pending" ? "bg-white shadow text-gray-800" : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setTaskFilter("pending")}
                >
                  待辦
                </button>
                <button
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    taskFilter === "completed" ? "bg-white shadow text-gray-800" : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setTaskFilter("completed")}
                >
                  已完成
                </button>
              </div>

              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{filteredTasks.length}</span>
            </div>
          </div>

          <div className="p-5">
            {filteredTasks.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                {taskFilter === "all" ? (
                  <>
                    <ListX className="h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-gray-500 mb-2">這個清單中還沒有任務</p>
                    <button
                      className="mt-4 px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors text-sm"
                      onClick={() => setShowAddTaskModal(true)}
                    >
                      新增第一個任務
                    </button>
                  </>
                ) : taskFilter === "pending" ? (
                  <>
                    <CheckCircle className="h-12 w-12 text-green-200 mb-4" />
                    <p className="text-gray-500">所有任務都已完成！</p>
                  </>
                ) : (
                  <>
                    <Filter className="h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-gray-500">目前沒有已完成的任務</p>
                  </>
                )}
              </div>
            ) : (
              <TodoList todos={filteredTasks} emptyMessage="沒有符合篩選條件的任務" />
            )}
          </div>

          {filteredTasks.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50 text-sm text-center text-gray-500">
              {taskFilter === "all"
                ? `顯示全部 ${filteredTasks.length} 個任務（${tasks.filter(t => !t.completed).length} 個待辦，${completedTasks} 個已完成）`
                : taskFilter === "pending"
                ? `顯示 ${filteredTasks.length} 個待辦任務`
                : `顯示 ${filteredTasks.length} 個已完成任務`}
            </div>
          )}
        </div>

        {/* 底部操作 */}
        <div className="flex justify-center space-x-4 py-4">
          <button
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
            onClick={() => setShowAddTaskModal(true)}
          >
            新增任務
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors" onClick={() => setShowEditListModal(true)}>
            編輯清單
          </button>
        </div>
      </div>

      {/* 新增任務模態框 */}
      <AnimatePresence>
        {showAddTaskModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <Plus className="h-5 w-5 mr-2 text-purple-600" />
                  新增任務
                </h2>
                <button className="text-gray-400 hover:text-gray-500" onClick={() => setShowAddTaskModal(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddTask} className="p-4 space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    任務標題 *
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={newTask.title}
                    onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    任務描述
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={newTask.description}
                    onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                      優先級
                    </label>
                    <select
                      id="priority"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      value={newTask.priority}
                      onChange={e => setNewTask({ ...newTask, priority: e.target.value as "low" | "medium" | "high" | "urgent" })}
                    >
                      <option value="low">低</option>
                      <option value="medium">中</option>
                      <option value="high">高</option>
                      <option value="urgent">緊急</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                      截止日期
                    </label>
                    <input
                      type="date"
                      id="dueDate"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      value={newTask.dueDate}
                      onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-3 border-t">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    onClick={() => setShowAddTaskModal(false)}
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    disabled={!newTask.title}
                  >
                    新增
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 編輯清單模態框 */}
      <AnimatePresence>
        {showEditListModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <EditIcon className="h-5 w-5 mr-2 text-gray-600" />
                  編輯清單
                </h2>
                <button className="text-gray-400 hover:text-gray-500" onClick={() => setShowEditListModal(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleEditList} className="p-4 space-y-4">
                <div>
                  <label htmlFor="listName" className="block text-sm font-medium text-gray-700">
                    清單名稱 *
                  </label>
                  <input
                    type="text"
                    id="listName"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={editedList.name}
                    onChange={e => setEditedList({ ...editedList, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="listDescription" className="block text-sm font-medium text-gray-700">
                    清單描述
                  </label>
                  <textarea
                    id="listDescription"
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={editedList.description}
                    onChange={e => setEditedList({ ...editedList, description: e.target.value })}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">顏色</label>
                  <div className="grid grid-cols-8 gap-2">
                    {["purple", "blue", "green", "red", "yellow", "pink", "gray", "indigo"].map(color => (
                      <button
                        key={color}
                        type="button"
                        className={`tag-color-circle ${color === editedList.color ? "ring-2 ring-offset-2 ring-gray-400" : ""}`}
                        style={{
                          backgroundColor: `rgb(var(--color-${color}-500))`,
                        }}
                        onClick={() => setEditedList({ ...editedList, color })}
                        aria-label={`選擇${color}顏色`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-3 border-t">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    onClick={() => setShowEditListModal(false)}
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    disabled={!editedList.name}
                  >
                    儲存
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
