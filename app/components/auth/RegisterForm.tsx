"use client";

import { useState } from "react";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong" | "">("");

  // 評估密碼強度
  const evaluatePasswordStrength = (pwd: string): "weak" | "medium" | "strong" | "" => {
    if (!pwd) return "";
    if (pwd.length < 8) return "weak";
    if (pwd.length >= 8 && /[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && /[0-9]/.test(pwd)) return "strong";
    return "medium";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(evaluatePasswordStrength(newPassword));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("密碼與確認密碼不符。");
      setLoading(false);
      return;
    }

    if (passwordStrength === "weak") {
      setError("密碼強度太弱，請使用至少8個字符，包含大小寫字母和數字。");
      setLoading(false);
      return;
    }

    try {
      // 這裡將實現實際的註冊功能
      // 目前只是模擬註冊過程
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("註冊成功", { username, email, password });
      // 註冊成功後重定向到首頁或登入頁
      window.location.href = "/";
    } catch (err) {
      setError("註冊失敗，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      {error && <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            用戶名
          </label>
          <div className="mt-1">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="您的用戶名"
            />
          </div>
        </div>

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

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            密碼
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={handlePasswordChange}
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
          {passwordStrength && (
            <div className="mt-1 flex items-center">
              <div
                className={`h-1 flex-grow rounded-full ${
                  passwordStrength === "weak" ? "bg-red-500" : passwordStrength === "medium" ? "bg-yellow-500" : "bg-green-500"
                }`}
              ></div>
              <span className="ml-2 text-xs text-gray-500">
                {passwordStrength === "weak" ? "弱密碼" : passwordStrength === "medium" ? "中等密碼" : "強密碼"}
              </span>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
            確認密碼
          </label>
          <div className="mt-1">
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
          {confirmPassword && password !== confirmPassword && <p className="mt-1 text-xs text-red-500">密碼不匹配</p>}
        </div>

        <div className="text-xs text-gray-500">
          <p>註冊即表示您同意我們的</p>
          <div className="mt-1 flex space-x-1">
            <a href="/terms" className="text-blue-600 hover:underline">
              服務條款
            </a>
            <span>和</span>
            <a href="/privacy" className="text-blue-600 hover:underline">
              隱私政策
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "註冊中..." : "註冊"}
          </button>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-50 px-2 text-gray-500">或使用以下方式註冊</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
            >
              <span className="sr-only">使用 Google 註冊</span>
              Google
            </button>
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
            >
              <span className="sr-only">使用 Apple 註冊</span>
              Apple
            </button>
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
            >
              <span className="sr-only">使用 Microsoft 註冊</span>
              Microsoft
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
