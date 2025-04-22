"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import AppHeader from "../components/AppHeader";

export default function TodoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 側邊欄 */}
      <div className={`${isSidebarOpen ? "block" : "hidden"} md:block`}>
        <Sidebar />
      </div>

      {/* 主內容區 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 頂部導航 */}
        <AppHeader toggleSidebar={toggleSidebar} isMobile={true} />

        {/* 頁面主體 */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
