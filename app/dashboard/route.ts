import { redirect } from "next/navigation";

// 如果用戶訪問根路徑 "/"，將會被重定向到 "/dashboard"
export function GET() {
  redirect("/dashboard");
}
