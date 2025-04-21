"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Sidebar from "../components/Sidebar";
import AppHeader from "../components/AppHeader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // 根據屏幕大小自動調整側邊欄
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 側邊欄 */}
      <div className={`fixed lg:relative z-20 transition-all duration-300 ${sidebarOpen ? "left-0" : "-left-64"} h-full`}>
        <Sidebar />
      </div>

      {/* 主內容區域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isMobile={isMobile} />

        {/* 內容區域 */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
