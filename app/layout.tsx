import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "智能待辦事項 | 人工智能驅動的任務管理工具",
  description: "智能待辦事項是一款人工智能驅動的任務管理工具，幫助您智能分類、優先級排序和高效協作，提升工作與生活效率。",
  keywords: "待辦事項, 任務管理, 時間管理, 智能分類, 人工智能, AI, 協作工具, 效率工具",
  authors: [{ name: "智能待辦事項團隊" }],
  creator: "智能待辦事項",
  publisher: "智能待辦事項",
  openGraph: {
    title: "智能待辦事項 | 人工智能驅動的任務管理工具",
    description: "智能待辦事項是一款人工智能驅動的任務管理工具，幫助您智能分類、優先級排序和高效協作，提升工作與生活效率。",
    url: "https://www.example.com",
    siteName: "智能待辦事項",
    images: [
      {
        url: "https://www.example.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "智能待辦事項預覽",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "智能待辦事項 | 人工智能驅動的任務管理工具",
    description: "智能待辦事項是一款人工智能驅動的任務管理工具，幫助您智能分類、優先級排序和高效協作，提升工作與生活效率。",
    images: ["https://www.example.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <head>
        <link rel="canonical" href="https://www.example.com" />
        <meta name="theme-color" content="#8B5CF6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "智能待辦事項",
              applicationCategory: "生產力工具",
              operatingSystem: "Web, iOS, Android",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "TWD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1024",
              },
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
