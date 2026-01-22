"use client";
import React from 'react';
import { Ghost, Zap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// 定义组件
export default function GlobalFooter({ showBack = true }: { showBack?: boolean }) {
  return (
    <footer className="mt-32 border-t-2 border-[#111111] pt-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-[10px] font-black uppercase tracking-widest">
      {/* 1. 左侧：版权信息 */}
      <div className="opacity-40 text-center md:text-left">
        © 2026 Post Buffett. INVESTING IN THE FUTURE.
      </div>

      {/* 2. 中间：黑色幽默监控数据 */}
      <div className="flex flex-row gap-6 justify-center">
        <div className="flex items-center gap-2">
          <Ghost size={14} className="opacity-50" />
          <span>INFLATION: 100%</span>
        </div>
        <div className="flex items-center gap-2 text-[#ff751f]">
          <Zap size={14} />
          <span>RAT_POISON: LETHAL</span>
        </div>
      </div>

      {/* 3. 右侧：返回按钮逻辑 */}
      <div className="flex justify-center md:justify-end">
        {showBack ? (
          <Link 
            href="/" 
            className="group flex items-center gap-2 hover:text-[#ff751f] transition-colors border-b-2 border-transparent hover:border-[#ff751f] pb-1"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Terminal</span>
          </Link>
        ) : (
          <div className="opacity-20 italic select-none">Terminal Active</div>
        )}
      </div>
    </footer>
  );
}