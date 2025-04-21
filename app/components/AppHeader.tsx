"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Bell, HelpCircle, Settings, User, Menu, X } from "lucide-react";

type AppHeaderProps = {
  toggleSidebar?: () => void;
  isMobile?: boolean;
};

export default function AppHeader({ toggleSidebar, isMobile = false }: AppHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "新任務已分配給您",
      content: "專案規劃文件已被分配給您",
      time: "10分鐘前",
      read: false,
    },
    {
      id: 2,
      title: "任務截止日期提醒",
      content: "「準備季度報告」將在明天到期",
      time: "1小時前",
      read: false,
    },
    {
      id: 3,
      title: "任務已完成",
      content: "「更新網站內容」已被標記為完成",
      time: "昨天",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // 處理表單提交
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 搜索功能實現
    console.log("搜索查詢:", searchQuery);
  };

  // 標記所有通知為已讀
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6">
      {/* 左側區域：移動版菜單按鈕 + 搜索 */}
      <div className="flex items-center flex-1">
        {isMobile && (
          <button onClick={toggleSidebar} className="p-2 mr-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none">
            <Menu size={20} />
          </button>
        )}

        <form onSubmit={handleSearchSubmit} className="max-w-md w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm"
              placeholder="搜尋任務、標籤或筆記..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* 右側區域：通知、說明和用戶菜單 */}
      <div className="flex items-center space-x-2">
        {/* 通知按鈕和下拉選單 */}
        <div className="relative">
          <button className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none inline-flex items-center justify-center" onClick={() => {}}>
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* 通知下拉選單 - 這裡使用隱藏而不是條件渲染來保留空間，在實際應用中可以使用useState控制顯示 */}
          <div className="hidden absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">通知</h3>
              <button className="text-xs text-purple-600 hover:text-purple-800 font-medium" onClick={markAllAsRead}>
                全部標為已讀
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto py-2">
              {notifications.length === 0 ? (
                <div className="px-4 py-6 text-center text-gray-500">
                  <p>目前沒有通知</p>
                </div>
              ) : (
                notifications.map(notification => (
                  <div key={notification.id} className={`px-4 py-3 hover:bg-gray-50 ${notification.read ? "" : "bg-purple-50"}`}>
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{notification.content}</p>
                  </div>
                ))
              )}
            </div>

            <div className="px-4 py-3 border-t border-gray-100 text-center">
              <Link href="/notifications" className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                查看所有通知
              </Link>
            </div>
          </div>
        </div>

        {/* 說明按鈕 */}
        <button className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none">
          <HelpCircle size={20} />
        </button>

        {/* 用戶頭像和下拉選單 */}
        <div className="relative">
          <button className="flex items-center space-x-2 focus:outline-none" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
              <User size={18} className="text-purple-700" />
            </div>
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="py-1">
                <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <User size={16} className="mr-2" />
                  個人資料
                </Link>
                <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings size={16} className="mr-2" />
                  設定
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100" onClick={() => console.log("登出")}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  登出
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
