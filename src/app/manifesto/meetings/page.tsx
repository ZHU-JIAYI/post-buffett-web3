"use client";
import React from 'react';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
// 引入你的外挂底部
import UnifiedFooter from '../../UnifiedFooter'; 

export default function MeetingsPage() {
  const years = Array.from({ length: 2025 - 1994 + 1 }, (_, i) => 2025 - i);

  const getMeetingSummary = (year: number) => {
    const db: { [key: number]: string } = {
      2025: "Projected analysis of post-Charlie era and massive Apple position adjustments.",
      2024: "First full meeting without Charlie Munger; prioritizing long-term cultural stability.",
      2023: "Deep dive into AI risks vs. human psychology and the Japan investment strategy.",
      2022: "The definitive critique of Bitcoin as a non-productive asset; $25 billion farm comparison.",
      2021: "Addressing the surge in retail trading and defending Berkshire's capital allocation.",
      2020: "Virtual meeting: Explaining the pivot on airlines and the 1930s comparison.",
      2019: "Reflecting on the missed opportunity in Amazon and the rise of platform monopolies.",
      2018: "Rat Poison Squared: The formal ideological battle against decentralized assets.",
      1999: "Standing firm against the Dot-com bubble: A classic lesson in discipline.",
      1994: "The foundational session on 'Moats' and 'Owner Earnings' logic."
    };
    return db[year] || "Live Session: Deconstructing legacy logic via CNBC's digital archive.";
  };

  return (
    <div className="min-h-screen pb-20 pt-24 px-4 md:px-12 bg-white text-[#111111]">
      <main className="max-w-5xl mx-auto">
        <header className="mb-20">
          <div className="flex items-center gap-2 text-[#ff751f] mb-6 font-black text-[10px] uppercase tracking-[0.3em]">
            Digital Archive // Source: CNBC
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            MEETING <span className="text-[#ff751f]">MINUTES</span>
          </h1>
          <p className="max-w-2xl text-sm font-bold uppercase opacity-60 leading-relaxed tracking-widest">
            Chronological index of annual shareholder meetings. 
            All entries linked to official CNBC video records.
          </p>
        </header>

        {/* 极简清单 */}
        <div className="border-t-4 border-black">
          {years.map(year => (
            <a 
              key={year}
              href={`https://buffett.cnbc.com/${year}-berkshire-hathaway-annual-meeting/`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col md:flex-row md:items-center py-6 border-b border-black/10 hover:bg-[#fffcf9] transition-all"
            >
              {/* 年份 */}
              <div className="w-24 md:w-32 flex-shrink-0 font-mono text-3xl font-black tracking-tighter">
                {year}
              </div>

              {/* 摘要内容 */}
              <div className="flex-1 text-sm md:text-base font-bold uppercase pr-4 leading-snug">
                {getMeetingSummary(year)}
              </div>

              {/* 常驻的操作提示：不再隐藏 */}
              <div className="mt-4 md:mt-0 flex items-center gap-2 font-black text-[10px] tracking-tighter opacity-40 group-hover:opacity-100 group-hover:text-[#ff751f] transition-all">
                CNBC_ARCHIVE <ExternalLink size={12} />
              </div>
            </a>
          ))}
        </div>

        {/* 统一外挂底部 */}
        <UnifiedFooter showBack={true} />
      </main>
    </div>
  );
}