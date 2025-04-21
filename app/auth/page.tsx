"use client";

import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">智能待辦事項</h1>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">{isLogin ? "登入您的帳戶" : "註冊新帳戶"}</h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "還沒有帳戶？" : "已經有帳戶？"}
            <button onClick={() => setIsLogin(!isLogin)} className="ml-1 font-medium text-blue-600 hover:text-blue-500 focus:outline-none">
              {isLogin ? "立即註冊" : "返回登入"}
            </button>
          </p>
        </div>

        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
}
