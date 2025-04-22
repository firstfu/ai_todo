"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Circle, CheckCircle, Star, Clock, Calendar, Tag, MoreHorizontal, Trash2, Edit, AlertTriangle } from "lucide-react";

export type TodoPriority = "low" | "medium" | "high" | "urgent";
export type TodoTag = { id: string; name: string; color: string };

export type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: TodoPriority;
  dueDate?: Date;
  tags: TodoTag[];
  isStarred: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

type TodoItemProps = {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onToggleStar: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

// 優先級到顏色的映射
const priorityColors: Record<TodoPriority, string> = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  urgent: "bg-red-100 text-red-800",
};

// 優先級到圖標的映射
const priorityIcons: Record<TodoPriority, React.ReactNode> = {
  low: <div className="w-2 h-2 rounded-full bg-blue-500"></div>,
  medium: <div className="w-2 h-2 rounded-full bg-yellow-500"></div>,
  high: <div className="w-2 h-2 rounded-full bg-orange-500"></div>,
  urgent: <AlertTriangle size={12} className="text-red-500" />,
};

export function TodoItem({ todo, onToggleComplete, onToggleStar, onDelete, onEdit }: TodoItemProps) {
  const [showActions, setShowActions] = useState(false);
  const formattedDate = todo.dueDate
    ? new Date(todo.dueDate).toLocaleDateString("zh-TW", {
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className={`group relative flex items-start p-3 rounded-lg border ${
        todo.completed ? "bg-gray-50 border-gray-100" : "bg-white border-gray-200"
      } hover:shadow-md transition-all duration-200 ease-in-out`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* 左側：完成狀態切換和優先級標記 */}
      <div className="flex-shrink-0 mr-3 flex flex-col items-center space-y-2">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`h-5 w-5 flex items-center justify-center rounded-full ${
            todo.completed ? "text-green-500 hover:text-green-600" : "text-gray-400 hover:text-gray-500"
          } transition-colors`}
        >
          {todo.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
        </button>
        <div className="h-4 w-4 flex items-center justify-center">{priorityIcons[todo.priority]}</div>
      </div>

      {/* 中間：任務內容 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <h3 className={`text-sm font-medium ${todo.completed ? "text-gray-500 line-through" : "text-gray-900"}`}>{todo.title}</h3>
          {todo.isStarred && <Star size={14} className="ml-2 text-yellow-400" fill="currentColor" />}
        </div>

        {todo.description && <p className={`mt-1 text-xs ${todo.completed ? "text-gray-400" : "text-gray-600"} line-clamp-2`}>{todo.description}</p>}

        {/* 標籤和到期日 */}
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          {todo.dueDate && (
            <div
              className={`inline-flex items-center px-2 py-0.5 rounded ${
                new Date(todo.dueDate) < new Date() && !todo.completed ? "bg-red-50 text-red-700" : "bg-gray-100 text-gray-700"
              }`}
            >
              <Calendar size={12} className="mr-1" />
              {formattedDate}
            </div>
          )}

          {todo.tags.map(tag => (
            <div
              key={tag.id}
              className={`inline-flex items-center px-2 py-0.5 rounded`}
              style={{
                backgroundColor: `rgba(var(--color-${tag.color}-100), 1)`,
                color: `rgba(var(--color-${tag.color}-800), 1)`,
              }}
            >
              <Tag size={12} className="mr-1" />
              {tag.name}
            </div>
          ))}
        </div>
      </div>

      {/* 右側：操作按鈕 */}
      <AnimatePresence>
        {showActions && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex items-center space-x-1 ml-2">
            <button
              onClick={() => onToggleStar(todo.id)}
              className={`p-1 rounded-full hover:bg-gray-100 ${todo.isStarred ? "text-yellow-400" : "text-gray-400"}`}
            >
              <Star size={16} fill={todo.isStarred ? "currentColor" : "none"} />
            </button>
            <button onClick={() => onEdit(todo.id)} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500">
              <Edit size={16} />
            </button>
            <button onClick={() => onDelete(todo.id)} className="p-1 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-500">
              <Trash2 size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

type TodoListProps = {
  todos: Todo[];
  title?: string;
  emptyMessage?: string;
};

export function TodoList({ todos, title, emptyMessage = "目前沒有任務" }: TodoListProps) {
  // 使用 useEffect 來更新 localTodos，確保當 props.todos 變更時能夠同步更新
  const [localTodos, setLocalTodos] = useState<Todo[]>(todos);

  // 添加 useEffect 監聽 todos 變更
  useEffect(() => {
    setLocalTodos(todos);
  }, [todos]);

  // 處理完成狀態切換
  const handleToggleComplete = (id: string) => {
    setLocalTodos(prev => prev.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  // 處理星標狀態切換
  const handleToggleStar = (id: string) => {
    setLocalTodos(prev => prev.map(todo => (todo.id === id ? { ...todo, isStarred: !todo.isStarred } : todo)));
  };

  // 處理刪除任務
  const handleDelete = (id: string) => {
    setLocalTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // 處理編輯任務
  const handleEdit = (id: string) => {
    console.log("Edit todo:", id);
    // 在這裡實現打開編輯模態框或側邊欄
  };

  return (
    <div className="space-y-4">
      {title && <h2 className="text-lg font-medium text-gray-900">{title}</h2>}

      {localTodos.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      ) : (
        <AnimatePresence>
          <div className="space-y-2">
            {localTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={handleToggleComplete}
                onToggleStar={handleToggleStar}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
