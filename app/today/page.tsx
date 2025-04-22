"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TodayPage() {
  const router = useRouter();

  useEffect(() => {
    // 將用戶從今日任務頁面重定向到所有任務頁面
    router.replace("/tasks");
  }, [router]);

  // 返回空元素，因為頁面會立即重定向
  return null;
}
