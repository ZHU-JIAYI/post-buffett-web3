"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Bookmark, FileText, MessageSquare, AlertCircle, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { X, Send, ArrowUpRight, ArrowDownRight, Zap, Quote, Ghost } from 'lucide-react';
import UnifiedFooter from './UnifiedFooter';

export default function ManifestoPage() {
  const accentColor = "#ff751f";

  const dossiers = [
    { 
      id: "letters",
      year: "1977 - 2024",
      title: "Annual Shareholder Letters",
      description: "Full repository of Omaha's paper-based doctrine. Original PDF transcripts of the yearly Oracle addresses.",
      type: "ARCHIVE",
      icon: <BookOpen size={20} />,
      link: "/manifesto/letters"
    },
    { 
      id: "meetings",
      year: "1994 - 2024",
      title: "Shareholder Meeting Minutes",
      description: "Direct records of the live Q&A sessions. Tracking the evolution of anti-crypto sentiment in real-time.",
      type: "HISTORICAL",
      icon: <FileText size={20} />,
      link: "/manifesto/meetings"
    },
    { 
      id: "aphorisms",
      year: "COLLECTED",
      title: "The Oracle's Aphorisms",
      description: "A database of famous quotes. Deciphering the 20th-century wisdom that built the moat.",
      type: "INTEL",
      icon: <MessageSquare size={20} />,
      link: "/manifesto/aphorisms"
    },
    { 
      id: "failures",
      year: "SYSTEMIC",
      title: "The Failure Logs",
      description: "Critical analysis of structural errors: from missing the Google protocols to the panic-selling of airline assets.",
      type: "CRITICAL",
      icon: <AlertCircle size={20} />,
      link: "/manifesto/failures"
    }
  ];

  return (
    <div className="min-h-screen pb-20 pt-24 px-4 md:px-12 bg-[#fffcf9]">
      <nav className="mb-12">
        <Link href="/" className="inline-flex items-center gap-2 font-black uppercase text-[10px] tracking-[0.2em] border-b-2 border-black pb-1 hover:text-[#ff751f] hover:border-[#ff751f] transition-all">
          <ArrowLeft size={14} /> Back to Terminal
        </Link>
      </nav>

      <main className="max-w-5xl mx-auto">
        <header className="border-b-4 border-[#111111] pb-12 mb-16">
          <div className="flex items-center gap-2 text-[#ff751f] mb-4 font-black text-[10px] uppercase tracking-[0.3em]">
            <Bookmark size={16} fill={accentColor} /> Classification: Omaha Legacy Archives
          </div>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8">
            THE <span style={{ color: accentColor }}>DOCKETS</span>
          </h1>
          <p className="max-w-2xl text-lg font-bold leading-tight opacity-70 uppercase border-l-4 border-black pl-6">
            Digitized records of 20th-century capital allocation. Select a docket to decrypt.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-12">
          {dossiers.map((dossier) => (
            <Link 
              key={dossier.id}
              href={dossier.link}
              className="group border-b-2 border-[#111111]/10 pb-12 hover:border-[#ff751f] transition-all block"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-2 font-mono font-black text-[10px] tracking-widest text-slate-400">
                  <div className="mb-2">[{dossier.year}]</div>
                  <div className="text-[#ff751f] italic">{dossier.type}</div>
                </div>
                <div className="md:col-span-7">
                  <h2 className="text-4xl font-black uppercase tracking-tight mb-4 group-hover:text-[#ff751f] transition-all flex items-center gap-3">
                    {dossier.icon} {dossier.title}
                  </h2>
                  <p className="font-bold text-sm leading-relaxed opacity-60 uppercase tracking-wide">
                    {dossier.description}
                  </p>
                </div>
                <div className="md:col-span-3 flex md:justify-end">
                  <span className="flex items-center gap-2 bg-[#111111] text-white px-6 py-3 font-black uppercase text-[10px] tracking-widest shadow-[4px_4px_0px_0px_#ff751f] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                    Open File <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>



        {/* 底部装饰 - 黑色幽默语录 */}
        <section className="mt-32 p-12 border-4 border-[#111111] bg-white shadow-[12px_12px_0px_0px_#111111] relative">
          <div className="absolute -top-6 left-10 bg-[#111111] text-white px-4 py-2 font-black uppercase text-[10px] tracking-widest">
            Notable Excerpt
          </div>
          <p className="text-2xl md:text-4xl font-black italic tracking-tighter leading-none mb-6">
            "I can promise you that if you could buy every farm in the United States... I would not give you $25 for all the Bitcoin in the world."
          </p>
          <div className="flex justify-between items-end font-bold text-[10px] uppercase tracking-widest">
            <div>Source: Annual Shareholders Meeting</div>
            <div className="text-[#ff751f]">Unchanged Consensus</div>
          </div>
        </section>

        {/* 底部引导 */}
        <UnifiedFooter showBack={true} />
      </main>
    </div>
  );
}