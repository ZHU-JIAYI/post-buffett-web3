"use client";
import React from 'react';
import { Quote, Activity, ChevronRight, Terminal } from 'lucide-react';
import UnifiedFooter from '../../UnifiedFooter'; 

export default function AphorismsPage() {
  const aphorisms = [
    {
      original: "Accounting is the language of business. You have to learn it like a new language to understand the world.",
      logic: "PROTOCOL_LITERACY: Master the base-layer syntax (Accounting) to parse the underlying reality of any entity.",
      author: "Buffett",
      id: "LOG_001"
    },
    {
      original: "The best investment you can make is an investment in yourself. Nobody can tax it or take it away.",
      logic: "SELF_COMPUTING: Upgrade your own biological hardware. Intangible assets have zero counterparty risk.",
      author: "Buffett",
      id: "LOG_002"
    },
    {
      original: "Invert, always invert.",
      logic: "FIRST_PRINCIPLES: Reverse-engineer failure modes to isolate the path to success.",
      author: "Munger",
      id: "LOG_003"
    },
    {
      original: "The big money is not in the buying and the selling, but in the waiting.",
      logic: "TIME_DILATION: Patience is the ultimate leverage. Let the compounding algorithm run without intervention.",
      author: "Munger",
      id: "LOG_004"
    },
    {
      original: "It's far better to buy a wonderful company at a fair price than a fair company at a wonderful price.",
      logic: "ASSET_SPECIFICATION: Prioritize high-fidelity systems over low-quality arbitrage opportunities.",
      author: "Buffett",
      id: "LOG_005"
    },
    {
      original: "Go to bed every night a little wiser than when you got up.",
      logic: "ITERATIVE_UPDATE: Daily knowledge commits. Ensure the delta of intelligence is always positive.",
      author: "Munger",
      id: "LOG_006"
    },
    {
      original: "Opportunities come infrequently. When it rains gold, put out the bucket, not the thimble.",
      logic: "MAX_EXPOSURE: When high-probability signals emerge, deploy maximum liquidity.",
      author: "Buffett",
      id: "LOG_007"
    },
    {
      original: "The world is full of foolish gamblers, and they will not do as well as the patient investors.",
      logic: "NOISE_FILTERING: Distinguish between chaotic gambling (Noise) and strategic allocation (Signal).",
      author: "Munger",
      id: "LOG_008"
    },
    {
      original: "Risk comes from not knowing what you're doing.",
      logic: "INFORMATION_ASYMMETRY: Risk is a function of ignorance. Maximize bandwidth to minimize volatility.",
      author: "Buffett",
      id: "LOG_009"
    }
  ];

  return (
    <main className="min-h-screen bg-[#fffcf9] pt-24 pb-20 px-6 md:px-12 flex flex-col items-center">
      {/* 核心容器 */}
      <div className="w-full max-w-5xl flex flex-col flex-grow">
        
        <header className="mb-24 border-b-4 border-black pb-10 relative">
          <div className="flex items-center gap-2 text-[#ff751f] mb-4 font-black text-[10px] uppercase tracking-[0.4em]">
            <Activity size={12} className="animate-pulse" /> Neural_Sync // Wisdom_Archive
          </div>
          <h1 className="text-6xl md:text-[100px] font-black uppercase tracking-tighter leading-none mb-6">
            THE <span className="text-[#ff751f]">APHORISMS</span>
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 max-w-sm">
              Legacy Intelligence Re-Encoded. Deconstructing 90+ years of cumulative logic.
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold opacity-20">
              <Terminal size={12}/> DATA_ENTRIES: {aphorisms.length}
            </div>
          </div>
        </header>

        {/* 语录列表 */}
        <div className="space-y-32 mb-48">
          {aphorisms.map((item, index) => (
            <div key={index} className="group flex flex-col gap-6 relative">
              {/* 装饰性背景编号 */}
              <div className="absolute -left-12 top-0 text-6xl font-black opacity-[0.03] select-none group-hover:opacity-10 transition-opacity">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* 索引与作者 */}
              <div className="flex items-center justify-between border-b border-black/5 pb-2">
                <span className="font-mono text-[10px] font-black text-[#ff751f]">[{item.id}]</span>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-30">— {item.author}</span>
              </div>

              {/* 语录主体 */}
              <div className="relative z-10">
                <Quote className="absolute -left-6 -top-4 opacity-5" size={48} />
                <p className="text-2xl md:text-5xl font-black tracking-tighter leading-[1.1] uppercase italic group-hover:text-[#ff751f] transition-colors duration-300">
                  "{item.original}"
                </p>
              </div>

              {/* 逻辑解码盒子 */}
              <div className="bg-[#111111] text-white p-8 shadow-[12px_12px_0px_0px_#ff751f] self-start md:self-end md:-mr-8 max-w-md transform group-hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-2 mb-3">
                  <ChevronRight size={14} className="text-[#ff751f]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#ff751f]">Logic_Decode</span>
                </div>
                <p className="text-[11px] md:text-xs font-bold leading-relaxed uppercase tracking-[0.1em] opacity-90">
                  {item.logic}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 底部缓冲与 Footer */}
        <div className="pt--100 pb--100"> 
          <UnifiedFooter showBack={true} />
        </div>
      </div>
    </main>
  );
}