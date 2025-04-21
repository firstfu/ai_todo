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
        <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      bgGradient: "from-blue-50 to-purple-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "優先級排序",
      description: "智能推薦任務優先級，幫助您專注於最重要的事項",
      icon: (
        <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      bgGradient: "from-purple-50 to-pink-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "協同合作",
      description: "輕鬆與團隊成員共享任務，提高協作效率",
      icon: (
        <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      bgGradient: "from-green-50 to-teal-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  // 客戶見證資料
  const testimonials = [
    {
      content: "智能待辦事項徹底改變了我的工作方式。它的智能分類功能讓我的任務清單變得井然有序，再也不會錯過重要的截止日期。",
      author: "林詩涵",
      position: "專案經理",
      avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    },
    {
      content: "作為一名自由工作者，我需要一個能幫助我管理多個客戶項目的工具。智能待辦事項的優先級排序功能非常棒，讓我能夠專注在真正重要的事情上。",
      author: "王建宏",
      position: "自由設計師",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      content: "我們團隊在使用智能待辦事項後，協作效率提高了至少 30%。它的共享功能讓團隊成員隨時了解項目進度，溝通更加順暢。",
      author: "陳美玲",
      position: "行銷總監",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  // FAQ 資料
  const faqs = [
    {
      question: "智能待辦事項是如何使用 AI 技術的？",
      answer:
        "我們的 AI 引擎會分析您的任務內容、截止日期、完成模式和使用習慣，自動分類任務並建議優先順序。系統會隨著您的使用而不斷學習，提供更加個性化的建議。",
    },
    {
      question: "免費版和付費版有什麼區別？",
      answer: "免費版提供基本的任務管理功能和有限的 AI 分類服務。付費版解鎖無限任務、高級 AI 分析、團隊協作、優先級預測和客製化報表等功能。",
    },
    {
      question: "我可以與團隊成員共享任務嗎？",
      answer: "是的，我們的協作功能允許您與團隊成員共享任務、分配工作、追蹤進度，並設置權限。付費方案支持更多的團隊成員和更細緻的權限控制。",
    },
    {
      question: "我的資料安全性如何得到保障？",
      answer: "我們使用銀行級別的加密技術保護您的資料，並嚴格遵守隱私法規。您的資料僅用於提供服務，絕不會出售給第三方。您可以隨時匯出或刪除您的資料。",
    },
    {
      question: "是否支持與其他工具整合？",
      answer: "智能待辦事項支持與 Google 日曆、Outlook、Slack、Trello 等多種常用工具整合，讓您的工作流程更加順暢。我們還提供 API 接口，方便進行自定義整合。",
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
      <div id="features" className="py-20 bg-gradient-to-b from-white via-purple-50/30 to-white overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[40%] -right-[10%] w-[60%] h-[80%] rounded-full bg-purple-100/30 blur-3xl"></div>
          <div className="absolute -bottom-[30%] -left-[10%] w-[50%] h-[70%] rounded-full bg-blue-100/20 blur-3xl"></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">功能特色</span>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">智能功能，提升效率</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">我們的智能待辦事項應用提供多種先進功能，幫助您更有效地管理任務。</p>
          </motion.div>

          <motion.div className="mt-12" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br ${feature.bgGradient} p-8 shadow-card transition-all duration-300 hover:shadow-card-hover group`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -8 }}
                >
                  <div
                    className="absolute right-0 bottom-0 w-32 h-32 rounded-tl-[100px] bg-white/20 -mr-8 -mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ backdropFilter: "blur(5px)" }}
                  ></div>
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div
                      className={`flex h-20 w-20 items-center justify-center rounded-full ${feature.iconBg} mb-6 transition-all duration-500 group-hover:scale-110`}
                    >
                      <span className={feature.iconColor}>{feature.icon}</span>
                    </div>
                    <h3 className="mb-4 text-xl font-bold text-gray-900 transition-all duration-300 group-hover:text-purple-700">{feature.title}</h3>
                    <p className="text-base text-gray-600 transition-all duration-300 group-hover:text-gray-700">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 客戶見證區塊 */}
      <section id="testimonials" className="bg-gradient-to-b from-white to-purple-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">用戶真實回饋</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">看看其他用戶如何使用智能待辦事項來提升他們的工作效率和生活品質。</p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-3 sm:gap-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden relative p-6 border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)" }}
              >
                <div className="relative">
                  <svg
                    className="absolute -top-2 -left-3 w-16 h-16 text-purple-100 transform -rotate-12"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="relative mt-4 text-base text-gray-600 italic">{testimonial.content}</p>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={testimonial.avatar} alt={testimonial.author} />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ區塊 */}
      <section id="faq" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">常見問題</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">我們整理了一些使用者最常詢問的問題，希望能幫助您更了解智能待辦事項。</p>
          </motion.div>

          <div className="mt-12 max-w-3xl mx-auto divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="py-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <details className="group">
                  <summary className="flex w-full items-center justify-between cursor-pointer list-none">
                    <h3 className="text-lg font-medium text-gray-900 group-open:text-purple-600 transition-colors">{faq.question}</h3>
                    <span className="ml-6 flex-shrink-0 text-gray-400 group-open:text-purple-600 transition-colors">
                      <svg
                        className="h-6 w-6 transform group-open:rotate-180 transition-transform duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="mt-3 pr-12">
                    <p className="text-base text-gray-600">{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-base text-gray-600">
              還有其他問題？{" "}
              <a href="#" className="font-medium text-purple-600 hover:text-purple-500 transition-colors">
                聯絡我們的客服團隊
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* 頁腳 */}
      <footer className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <span className="text-xl font-bold text-purple-400">智能待辦事項</span>
              </div>
              <p className="mt-3 text-sm text-gray-400 max-w-md">智能待辦事項幫助您智能分類、優先級排序和高效協作，提升工作與生活效率。</p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">產品</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="#features" className="text-sm text-gray-300 hover:text-white transition-colors">
                      功能介紹
                    </a>
                  </li>
                  <li>
                    <a href="#pricing" className="text-sm text-gray-300 hover:text-white transition-colors">
                      價格方案
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">資源</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="#faq" className="text-sm text-gray-300 hover:text-white transition-colors">
                      常見問題
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                      使用教學
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">聯絡我們</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                      客戶支援
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                      隱私政策
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <p className="mt-8 md:mt-0 text-xs leading-5 text-gray-400">&copy; 2024 智能待辦事項. 版權所有.</p>
          </div>
        </div>
      </footer>

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

      {/* 頁腳 */}
      <footer className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
          <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div>
              <h3 className="text-lg font-semibold leading-6 text-white">產品</h3>
              <ul role="list" className="mt-4 space-y-3">
                <li>
                  <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    功能介紹
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    價格方案
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    客戶案例
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    產品更新
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold leading-6 text-white">資源</h3>
              <ul role="list" className="mt-4 space-y-3">
                <li>
                  <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    使用教學
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    API 文檔
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    最佳實踐
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    常見問題
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold leading-6 text-white">公司</h3>
              <ul role="list" className="mt-4 space-y-3">
                <li>
                  <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    關於我們
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    聯絡我們
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    合作夥伴
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    媒體中心
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold leading-6 text-white">法律</h3>
              <ul role="list" className="mt-4 space-y-3">
                <li>
                  <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    隱私政策
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    服務條款
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    Cookie 政策
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    資料保護
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold leading-6 text-white">訂閱更新</h3>
              <p className="mt-4 text-sm leading-6 text-gray-300">訂閱我們的電子報，獲取最新功能更新和使用技巧。</p>
              <form className="mt-4">
                <div className="flex gap-x-3">
                  <label htmlFor="email-address" className="sr-only">
                    電子郵件
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="min-w-0 flex-auto rounded-md border-0 bg-gray-800 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
                    placeholder="輸入您的電子郵件"
                  />
                  <button
                    type="submit"
                    className="flex-none rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
                  >
                    訂閱
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">&copy; 2024 智能待辦事項. 版權所有.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
