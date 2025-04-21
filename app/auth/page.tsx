"use client";

import { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 頁面動畫變體
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2 + custom * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen flex md:items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* 裝飾元素 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-purple-200 to-purple-300 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-blue-200 to-blue-300 rounded-full blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-200 to-indigo-300 rounded-full blur-3xl opacity-10 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container relative z-10 w-full max-w-7xl px-6 py-12 flex flex-col md:flex-row items-center md:items-stretch">
        {/* 左側產品介紹區 */}
        <motion.div className="w-full md:w-1/2 pr-0 md:pr-8 mb-12 md:mb-0 text-center md:text-left" variants={pageVariants} initial="hidden" animate="visible">
          <motion.div className="md:sticky md:top-0 pb-8" variants={itemVariants}>
            <div className="flex justify-center md:justify-start items-center mb-8">
              <div className="inline-block p-3 rounded-full bg-white shadow-md mr-3">
                <svg className="w-8 h-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                智能待辦事項
              </h1>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              智慧管理您的
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">每日任務和目標</span>
            </h2>

            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              智能待辦事項讓您輕鬆組織生活和工作，通過直觀的界面和智能提醒功能，助您高效完成每一個目標。
            </p>

            <div className="border-t border-gray-200 pt-8 max-w-lg mx-auto md:mx-0">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">為什麼選擇我們？</h3>

              <ul className="space-y-4">
                <motion.li className="flex items-start" variants={featureVariants} custom={0}>
                  <div className="flex-shrink-0 p-1 bg-purple-100 rounded-full">
                    <svg className="h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-base font-medium text-gray-800">智能分類與提醒</h4>
                    <p className="mt-1 text-sm text-gray-500">自動分類您的任務，並在最合適的時間提醒您，不遺漏任何重要事項。</p>
                  </div>
                </motion.li>

                <motion.li className="flex items-start" variants={featureVariants} custom={1}>
                  <div className="flex-shrink-0 p-1 bg-indigo-100 rounded-full">
                    <svg className="h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-base font-medium text-gray-800">團隊協作功能</h4>
                    <p className="mt-1 text-sm text-gray-500">與團隊成員輕鬆共享任務和項目，協同工作更高效。</p>
                  </div>
                </motion.li>

                <motion.li className="flex items-start" variants={featureVariants} custom={2}>
                  <div className="flex-shrink-0 p-1 bg-blue-100 rounded-full">
                    <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-base font-medium text-gray-800">數據統計與分析</h4>
                    <p className="mt-1 text-sm text-gray-500">追蹤您的完成率和生產力，獲取個人化報告助您不斷進步。</p>
                  </div>
                </motion.li>

                <motion.li className="flex items-start" variants={featureVariants} custom={3}>
                  <div className="flex-shrink-0 p-1 bg-green-100 rounded-full">
                    <svg className="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-base font-medium text-gray-800">跨平台同步</h4>
                    <p className="mt-1 text-sm text-gray-500">所有設備實時同步，讓您隨時隨地管理您的任務。</p>
                  </div>
                </motion.li>
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
              <div className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600 shadow-sm border border-gray-200">
                <svg className="h-4 w-4 mr-1 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                超過10,000+五星好評
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600 shadow-sm border border-gray-200">
                <svg className="h-4 w-4 mr-1 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                每月超過20萬活躍用戶
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 右側登入表單區 */}
        <motion.div className="w-full md:w-1/2 md:min-h-[700px] flex items-center justify-center" variants={pageVariants} initial="hidden" animate="visible">
          <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="px-8 pt-8 pb-4">
              <motion.h2 className="text-2xl font-bold tracking-tight text-gray-800 text-center" variants={itemVariants}>
                {isLogin ? "登入您的帳戶" : "註冊新帳戶"}
              </motion.h2>
              <motion.p className="mt-2 text-base text-gray-600 text-center" variants={itemVariants}>
                {isLogin ? "還沒有帳戶？" : "已經有帳戶？"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-1 font-medium text-purple-600 hover:text-purple-700 focus:outline-none transition-colors"
                >
                  {isLogin ? "立即註冊" : "返回登入"}
                </button>
              </motion.p>
            </div>

            <motion.div variants={itemVariants}>{isLogin ? <Login /> : <Register />}</motion.div>

            <motion.div className="px-8 py-6 bg-gray-50 text-center text-xs text-gray-500" variants={itemVariants}>
              <p>© {new Date().getFullYear()} 智能待辦事項. 版權所有.</p>
              <p className="mt-1">
                使用此服務，即表示您同意我們的{" "}
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  服務條款
                </a>{" "}
                和{" "}
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  隱私政策
                </a>
                .
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
