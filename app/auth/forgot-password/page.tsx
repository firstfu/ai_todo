"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 這裡將實現實際的密碼重置請求功能
      // 目前只是模擬過程
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("密碼重置請求已發送", { email });
      setSubmitted(true);
    } catch (err) {
      setError("無法發送密碼重置鏈接，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">智能待辦事項</h1>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">重置您的密碼</h2>
          <p className="mt-2 text-sm text-gray-600">輸入您的電子郵件，我們將發送密碼重置連結給您</p>
        </div>

        {error && <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</div>}

        {submitted ? (
          <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
            <p>密碼重置鏈接已發送到您的電子郵件：{email}</p>
            <p className="mt-2">請查看您的收件箱（和垃圾郵件資料夾），然後點擊郵件中的連結來重置您的密碼。</p>
            <div className="mt-4">
              <Link href="/" className="text-green-700 underline hover:text-green-600">
                返回登入頁面
              </Link>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                電子郵件
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                返回登入
              </Link>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? "發送中..." : "發送重置連結"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
