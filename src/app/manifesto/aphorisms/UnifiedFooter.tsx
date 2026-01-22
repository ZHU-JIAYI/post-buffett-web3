"use client";
import React from 'react';
import Link from 'next/link';

// 内部集成图标
const Icons = {
  Ghost: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/></svg>
  ),
  Zap: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  ArrowLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
  )
};

export default function UnifiedFooter({ showBack = true }: { showBack?: boolean }) {
  return (
    /* 重点：增加 pb-20 (底部内边距) 和 pt-20 (上方留白) */
    <footer className="w-full px-4 md:px-12 mt-32 border-t-2 border-[#111111] pt-10 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-[10px] font-black uppercase tracking-widest leading-none">
        
        {/* 左侧：版权 */}
        <div className="opacity-40 text-center md:text-left">
          © 2026 Post Buffett. INVESTING IN THE FUTURE.
        </div>

        {/* 中间：监控数据 */}
        <div className="flex flex-row gap-6 justify-center">
          <div className="flex items-center gap-2">
            <Icons.Ghost /> 
            <span>INFLATION: 100%</span>
          </div>
          <div className="flex items-center gap-2 text-[#ff751f]">
            <Icons.Zap /> 
            <span>RAT_POISON: LETHAL</span>
          </div>
        </div>

        {/* 右侧：返回按钮 */}
        <div className="flex justify-center md:justify-end">
          {showBack && (
            <Link href="/" className="flex items-center gap-2 hover:text-[#ff751f] transition-all border-b-2 border-transparent hover:border-[#ff751f] pb-1">
              <Icons.ArrowLeft /> RETURN TO TERMINAL
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}