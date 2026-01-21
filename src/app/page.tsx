"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, BarChart, Twitter, Activity, Layers, Repeat } from 'lucide-react';

export default function UltimateComparison() {
  const [cryptoData, setCryptoData] = useState<any>(null);
  const [muskQuote, setMuskQuote] = useState("Fate loves irony.");
  
  const quotes = [
    "Fate loves irony.",
    "The most entertaining outcome is the most likely.",
    "Bitcoin is almost as bs as fiat money.",
    "Doge to the moon!",
    "Tesla will make some merch buyable with Doge."
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd&include_24hr_change=true');
        setCryptoData(res.data);
      } catch (e) {
        console.error("Price fetch failed");
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    
    let i = 0;
    const quoteInterval = setInterval(() => {
      setMuskQuote(quotes[i % quotes.length]);
      i++;
    }, 8000);

    return () => {
      clearInterval(interval);
      clearInterval(quoteInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* 顶部滚动条 */}
      <div className="bg-black text-white py-2 overflow-hidden whitespace-nowrap text-[10px] uppercase tracking-widest font-bold">
        <motion.div animate={{ x: [0, -1000] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex gap-10">
          {[1,2,3,4].map(i => (
            <span key={i}>BRK.A: $615,430 • BTC: ${cryptoData?.bitcoin?.usd || '...'} • DOGE: ${cryptoData?.dogecoin?.usd || '...'} • ETH: ${cryptoData?.ethereum?.usd || '...'}</span>
          ))}
        </motion.div>
      </div>

      <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* 左侧：巴菲特 */}
        <section className="p-8 md:p-16 border-r border-slate-100 bg-[#FCFAF5] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-12 opacity-50">
              <BarChart size={16} />
              <span className="text-xs font-bold uppercase font-mono tracking-widest">The Old Guard</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter leading-none mb-6">
              The <br/>Value <br/>Oracle.
            </h1>
            <p className="text-slate-400 font-serif italic text-xl max-w-sm mb-12">
              "If you offered me all the Bitcoin in the world for $25, I wouldn't take it."
            </p>
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Berkshire Hathaway</p>
                <div className="flex justify-between items-baseline font-serif">
                  <span className="text-2xl font-bold italic">BRK.A</span>
                  <span className="text-3xl font-bold">$615,430</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-300 uppercase tracking-widest mt-10">
            Institutional Settlement • T+2 Speed
          </div>
        </section>

        {/* 右侧：马斯克/Web3 */}
        <section className="p-8 md:p-16 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-12 text-orange-600">
              <Activity size={16} className="animate-pulse" />
              <span className="text-xs font-bold uppercase font-mono tracking-widest">Live Reality</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-sans font-black tracking-tighter leading-none mb-10 italic uppercase">
              The <br/><span className="text-orange-600">Rat</span> <br/>Poison.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="p-6 bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Bitcoin</p>
                <p className="text-3xl font-black font-mono tracking-tighter italic">
                  ${cryptoData?.bitcoin?.usd.toLocaleString() || '...'}
                </p>
              </div>
              <div className="p-6 bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Dogecoin</p>
                <p className="text-3xl font-black font-mono tracking-tighter italic text-orange-600">
                  ${cryptoData?.dogecoin?.usd.toFixed(4) || '...'}
                </p>
              </div>
            </div>
            {/* 马斯克推文 */}
            <div className="bg-black text-white p-8 relative">
              <Twitter size={24} className="text-blue-400 mb-6" />
              <AnimatePresence mode='wait'>
                <motion.p 
                  key={muskQuote}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xl font-mono font-bold leading-tight"
                >
                  "{muskQuote}"
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
          <button className="mt-12 w-full py-5 bg-orange-600 text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl">
            Exit the Matrix
          </button>
        </section>
      </main>
    </div>
  );
}
