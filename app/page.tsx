"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Login from "./auth/Login";
import Register from "./auth/Register";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  // 動畫變體
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const features = [
    {
      title: "智能分類",
      description: "自動分析並分類您的待辦事項，讓工作更有條理",
      icon: (
        <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      title: "優先級排序",
      description: "智能推薦任務優先級，幫助您專注於最重要的事項",
      icon: (
        <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "協同合作",
      description: "輕鬆與團隊成員共享任務，提高協作效率",
      icon: (
        <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* 導航欄 */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold text-purple-600">智能待辦事項</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="#features" className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
                功能
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
                價格
              </Link>
              <Link href="#faq" className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
                常見問題
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 英雄區塊 */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="sm:text-center lg:text-left"
                >
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">提高效率的</span>
                    <span className="block text-purple-600">智能待辦清單</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                    藉助人工智能，讓您的待辦事項不再雜亂無章。智能分類、優先級排序，助您提高工作與生活效率。
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <a
                        href="#"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 md:py-4 md:px-10 md:text-lg"
                      >
                        免費開始使用
                      </a>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <a
                        href="#features"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-purple-100 px-8 py-3 text-base font-medium text-purple-700 hover:bg-purple-200 md:py-4 md:px-10 md:text-lg"
                      >
                        了解更多
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* 登入/註冊卡片 */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-black/5"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold tracking-tight text-gray-900">{isLogin ? "登入您的帳戶" : "註冊新帳戶"}</h2>
                      <p className="mt-2 text-sm text-gray-600">
                        {isLogin ? "還沒有帳戶？" : "已經有帳戶？"}
                        <button onClick={() => setIsLogin(!isLogin)} className="ml-1 font-medium text-purple-600 hover:text-purple-500 focus:outline-none">
                          {isLogin ? "立即註冊" : "返回登入"}
                        </button>
                      </p>
                    </div>

                    {isLogin ? <Login /> : <Register />}
                  </div>
                </motion.div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* 特色功能區塊 */}
      <div id="features" className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">智能功能，提升效率</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">我們的智能待辦事項應用提供多種先進功能，幫助您更有效地管理任務。</p>
          </motion.div>

          <motion.div className="mt-12" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div key={index} className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm" variants={itemVariants}>
                  <div>
                    <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-purple-100">{feature.icon}</div>
                    <h3 className="mt-2 ml-16 text-lg font-medium text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="mt-4 text-base text-gray-500">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 背景裝飾 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern id="hero-pattern" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
            <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" strokeWidth="0" />
          </svg>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero-pattern)" />
        </svg>
      </div>
    </div>
  );
}
