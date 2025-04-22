"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">頁面未找到</h2>
        <p className="text-gray-600 mb-8">很抱歉，您嘗試訪問的頁面不存在或已被移除。</p>
        <Link
          href="/tasks"
          className="inline-flex items-center px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          返回所有任務
        </Link>
      </div>
    </div>
  );
}
