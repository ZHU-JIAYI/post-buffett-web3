"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { X, Send, Home, BookOpen, ChevronRight, Activity } from 'lucide-react';
import Link from 'next/link';
import UnifiedFooter from './UnifiedFooter';

export default function TokenComingSoon() {
  const accentColor = "#ff751f";

  const scanlineVariants: Variants = {
    scrolling: {
      top: ["0%", "100%"],
      transition: { 
        repeat: Infinity, 
        duration: 2, 
        ease: "linear" as const 
      }
    }
  };

  return (
    /* 1. 移除 justify-center 和 items-center，改为 flex-col + pt-32 (顶部留白) */
    <div className="min-h-screen bg-[#fff1e5] text-[#111111] font-sans flex flex-col relative overflow-x-hidden">
      
      {/* 背景水印保持不变 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-[40vw] font-black"
        >
          TOKEN
        </motion.div>
      </div>

      {/* 2. 这里的容器去掉 relative，让 Footer 能够正确排在后面 */}
      <main className="relative z-10 w-full flex-grow flex flex-col items-center pt-24 md:pt-32 px-6">
        
        {/* 3. 卡片容器 */}
        <div className="w-full max-w-5xl border-4 border-[#111111] bg-white p-8 md:p-12 shadow-[16px_16px_0px_0px_#ff751f] relative overflow-hidden">
          
          <motion.div 
            variants={scanlineVariants}
            animate="scrolling"
            className="absolute left-0 w-full h-[2px] bg-[#ff751f]/20 z-20 pointer-events-none"
          />

          <div className="flex justify-between items-center mb-12 border-b-2 border-[#111111] pb-4">
            <div className="flex items-center gap-2 text-[#ff751f] font-black text-xs tracking-widest uppercase">
              <Activity size={14} className="animate-pulse" /> Signal_Detected
            </div>
            <div className="font-mono text-[10px] font-bold opacity-40 uppercase">
              Phase: Initializing_Liquidity
            </div>
          </div>

          <header className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4 italic"
            >
              COMING <br/>
              <span style={{ color: accentColor }}>SOON</span>
            </motion.h1>
            <div className="h-1 w-24 bg-[#111111] mx-auto mb-6" />
            <p className="font-bold text-sm uppercase tracking-[0.3em] opacity-60">
              The Post-Buffett Equity Protocol
            </p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <Link href="/" className="flex items-center justify-between p-4 border-2 border-[#111111] hover:bg-[#111111] hover:text-white transition-all group font-black uppercase text-xs tracking-widest">
              <span className="flex items-center gap-2"><Home size={16}/> Terminal</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/manifesto" className="flex items-center justify-between p-4 border-2 border-[#111111] hover:bg-[#111111] hover:text-white transition-all group font-black uppercase text-xs tracking-widest">
              <span className="flex items-center gap-2"><BookOpen size={16}/> Archives</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="https://x.com" target="_blank" className="flex items-center justify-between p-4 border-2 border-[#111111] hover:bg-[#ff751f] hover:text-black transition-all group font-black uppercase text-xs tracking-widest">
              <span className="flex items-center gap-2"><X size={16}/> Twitter / X</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://t.me" target="_blank" className="flex items-center justify-between p-4 border-2 border-[#111111] hover:bg-[#111111] hover:text-white transition-all group font-black uppercase text-xs tracking-widest">
              <span className="flex items-center gap-2"><Send size={16}/> Telegram</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </section>

          <div className="bg-[#fff1e5] p-4 border-2 border-[#111111] flex flex-col gap-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
              <span>Token Distribution Progress</span>
              <span className="text-[#ff751f]">68.4%</span>
            </div>
            <div className="w-full h-4 bg-white border-2 border-[#111111] overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "68.4%" }}
                transition={{ duration: 2, delay: 0.5 }}
                className="h-full bg-[#ff751f]"
              />
            </div>
          </div>
        </div>

        <p className="mt-8 mb-20 text-center font-black uppercase text-[10px] tracking-[0.4em] opacity-30">
          "The market is closed. The future is open."
        </p>

        {/* 4. Footer 放在 main 容器内，自动跟在内容后面 */}
        <UnifiedFooter showBack={true} />
      </main>
    </div>
  );
}