import { redirect } from "next/navigation";

// 在真實應用中，這裡會檢查用戶是否已登入
// 如已登入則導向儀表板，否則導向登入頁面
export function GET() {
  // 假設有一個 isAuthenticated 函數來檢查用戶的登入狀態
  const isAuthenticated = true; // 這僅是模擬，實際應用中需要真正的驗證邏輯

  if (isAuthenticated) {
    redirect("/dashboard");
  } else {
    redirect("/auth/login");
  }
}
