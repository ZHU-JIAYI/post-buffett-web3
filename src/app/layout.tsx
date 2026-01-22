import type { Metadata } from "next";
import "./globals.css";
// 注意：Lucide 图标库中 Twitter 现在推荐使用 X，或者保留使用 Twitter 
import { X, Send, Menu } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Post Buffett | Investing in the Future",
  description: "Debunking 20th-century value investing. Tracking the 'Rat Poison' in real-time.",
  // 如果你有 favicon.ico 放在 public 文件夹下，Next.js 会自动识别
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const accentColor = "#ff751f"; // 你指定的橙色

  return (
    <html lang="en">
      <body className="bg-[#fff1e5] text-[#111111] font-sans antialiased overflow-x-hidden">
        {/* 全局导航 - 仿 FT 顶部电报条风格 */}
        <nav className="fixed top-0 w-full z-50 border-b-2 border-[#111111] bg-[#fff1e5]/90 backdrop-blur-md px-4 md:px-8 py-3 flex justify-between items-center">
          
          {/* 左侧 Logo 区 */}
          {/* 修改这里：将 Logo 和文字包裹在 Link 中 */}
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            {/* 黑色小方块 Logo */}
            <div 
              style={{ backgroundColor: "#111111" }} 
              className="w-8 h-8 flex items-center justify-center font-black text-white text-xs shadow-[2px_2px_0px_0px_#ff751f] group-hover:shadow-[0px_0px_0px_0px_#ff751f] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all"
            >
              PB
            </div>
            
            {/* Post Buffett 文字 */}
            <span className="font-black tracking-tighter text-sm hidden sm:block uppercase group-hover:text-[#ff751f] transition-colors">
              Post Buffett <span style={{ color: accentColor }}></span>
            </span>
          </Link>

          {/* 右侧 社交与操作区 */}
          <div className="flex gap-4 md:gap-8 items-center">
            <div className="hidden md:flex gap-6 border-r border-[#111111] pr-6">
              <a 
                href="https://x.com/你的账号" 
                target="_blank" 
                className="hover:text-[#ff751f] transition-colors flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest"
              >
                <X size={14} /> Twitter
              </a>
              <a 
                href="https://t.me/你的频道" 
                target="_blank" 
                className="hover:text-[#ff751f] transition-colors flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest"
              >
                <Send size={14} /> Telegram
              </a>
            </div>

            {/* 连接钱包按钮 - 赛博边框风格 */}
            <button 
              style={{ borderColor: "#111111" }}
              className="group relative bg-[#111111] text-white px-5 py-1.5 text-[10px] font-black uppercase tracking-widest hover:bg-[#ff751f] transition-all"
            >
              <span className="relative z-10">Connect Wallet</span>
              {/* 装饰性的小方块，增加赛博感 */}
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#ff751f] group-hover:bg-black transition-colors"></div>
            </button>
          </div>
        </nav>

        {/* 页面主内容 */}
        <div className="relative">
          {children}
        </div>

        {/* 全局底部水印或装饰 (可选) */}
        <div className="fixed bottom-4 left-4 pointer-events-none opacity-10 hidden lg:block">
          <div className="text-[60px] font-black leading-none select-none uppercase">
            Investing in the  <br/> Future
          </div>
        </div>
      </body>
    </html>
  );
}