"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Register from "../Register";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="flex justify-center">
            <Link href="/" className="flex items-center text-3xl font-bold text-purple-600">
              智能待辦事項
            </Link>
          </motion.div>
          <motion.h2
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-center text-3xl font-extrabold text-gray-900"
          >
            註冊新帳戶
          </motion.h2>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-2 text-center text-sm text-gray-600"
          >
            已有帳戶？{" "}
            <Link href="/auth/login" className="font-medium text-purple-600 hover:text-purple-500">
              立即登入
            </Link>
          </motion.p>
        </div>

        <div className="mt-8">
          <Register />
        </div>
      </div>
    </div>
  );
}
