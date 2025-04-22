"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ListTodo, Plus, Settings, BarChart2, Bell, FolderPlus } from "lucide-react";

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
  count?: number;
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [customLists, setCustomLists] = useState<{ id: string; name: string; count: number }[]>([
    { id: "work", name: "工作專案", count: 8 },
    { id: "personal", name: "個人計畫", count: 5 },
    { id: "shopping", name: "購物清單", count: 3 },
  ]);

  const mainNavItems: NavItem[] = [{ name: "所有任務", href: "/tasks", icon: <ListTodo size={20} />, count: 23 }];

  const additionalNavItems: NavItem[] = [
    { name: "統計分析", href: "/stats", icon: <BarChart2 size={20} /> },
    { name: "通知中心", href: "/notifications", icon: <Bell size={20} />, count: 2 },
    { name: "設定", href: "/settings", icon: <Settings size={20} /> },
  ];

  // 判斷連結是否處於活動狀態
  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div className={`h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        {!isCollapsed && <span className="text-xl font-bold text-purple-600">智能待辦事項</span>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 rounded-md hover:bg-gray-100 text-gray-500">
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-8">
        {/* 主要導航項目 */}
        <nav className="space-y-1">
          {mainNavItems.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center py-2 px-3 rounded-lg transition-colors ${
                isActive(item.href) ? "bg-purple-50 text-purple-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!isCollapsed && (
                <>
                  <span className="ml-3 flex-1">{item.name}</span>
                  {item.count !== undefined && <span className="ml-3 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{item.count}</span>}
                </>
              )}
            </Link>
          ))}
        </nav>

        {/* 自定義清單 */}
        <div>
          <div className="flex items-center justify-between mb-2 px-2">
            {!isCollapsed && <h3 className="text-xs font-semibold text-gray-500 uppercase">自定義清單</h3>}
            <button className="p-1 rounded-md hover:bg-gray-100 text-gray-500">
              <FolderPlus size={isCollapsed ? 20 : 16} />
            </button>
          </div>
          <nav className="space-y-1">
            {customLists.map(list => (
              <Link
                key={list.id}
                href={`/lists/${list.id}`}
                className="flex items-center py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                {!isCollapsed && (
                  <>
                    <span className="ml-3 flex-1 truncate">{list.name}</span>
                    <span className="ml-3 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{list.count}</span>
                  </>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* 附加功能 */}
        <nav className="space-y-1 pt-4 border-t border-gray-200">
          {additionalNavItems.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center py-2 px-3 rounded-lg transition-colors ${
                isActive(item.href) ? "bg-purple-50 text-purple-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!isCollapsed && (
                <>
                  <span className="ml-3 flex-1">{item.name}</span>
                  {item.count !== undefined && <span className="ml-3 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{item.count}</span>}
                </>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
