"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, BarChart, Twitter, Activity, Layers, Repeat } from 'lucide-react';

export default function UltimateComparison() {
  const [cryptoData, setCryptoData] = useState<any>(null);
  const [muskQuote, setMuskQuote] = useState("");
  const quotes = [
    "Fate loves irony.",
    "The most entertaining outcome is the most likely.",
    "Bitcoin is almost as bs as fiat money.",
    "Doge to the moon!",
    "Tesla will make some merch buyable with Doge & see how it goes."
  ];

  // 1. 实时获取多币种数据 (BTC, ETH, DOGE)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true');
        setCryptoData(res.data);
      } catch (e) {
        console.error("Price fetch failed");
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    
    // 模拟马斯克推文轮播
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

  const brkaPrice = 615430; // 模拟伯克希尔价格

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-black selection:text-white">
      {/* 顶部通栏 - 实时流动性滚动 */}
      <div className="bg-black text-white py-2 overflow-hidden whitespace-nowrap text-[10px] uppercase tracking-widest font-bold">
        <motion.div animate={{ x: [0, -1000] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex gap-10">
          {[1,2,3,4].map(i => (
            <span key={i}>BRK.A: $615,430 (STABLE) • BTC: ${cryptoData?.bitcoin?.usd} • ETH: ${cryptoData?.ethereum?.usd} • DOGE: ${cryptoData?.dogecoin?.usd} • GAS: 24 GWEI</span>
          ))}
        </motion.div>
      </div>

      <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        
        {/* --- 左侧：THE OLD GUARD (巴菲特) --- */}
        <section className="p-8 md:p-16 border-r border-slate-100 flex flex-col justify-between bg-[#FCFAF5]">
          <div>
            <div className="flex items-center gap-2 mb-12 opacity-50">
              <BarChart size={16} />
              <span className="text-xs font-bold tracking-tighter uppercase font-mono">Archive / 20th Century Financials</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter leading-none mb-6">
              The <br/>Value <br/>Oracle.
            </h1>
            <p className="text-slate-400 font-serif italic text-xl max-w-sm mb-12">
              "If you offered me all the Bitcoin in the world for $25, I wouldn't take it."
            </p>

            <div className="space-y-8">
              <div className="border-b border-slate-200 pb-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Anchor Asset</p>
                <div className="flex justify-between items-baseline font-serif">
                  <span className="text-2xl font-bold italic">Berkshire Hathaway</span>
                  <span className="text-3xl">${brkaPrice.toLocaleString()}</span>
                </div>
              </div>
              <div className="border-b border-slate-200 pb-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Growth Index</p>
                <div className="flex justify-between items-baseline font-serif">
                  <span className="text-2xl font-bold italic">S&P 500 Legacy</span>
                  <span className="text-xl text-slate-400">Steady & Boring</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 text-[10px] font-mono text-slate-300 uppercase tracking-widest">
            Institutional Custody Required • Slow Settlement
          </div>
        </section>

        {/* --- 右侧：THE NEW FRONTIER (Web3 / 马斯克) --- */}
        <section className="p-8 md:p-16 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-12 text-orange-600">
              <Activity size={16} className="animate-pulse" />
              <span className="text-xs font-bold tracking-tighter uppercase font-mono">Live / On-Chain Reality</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-sans font-black tracking-tighter leading-none mb-10 italic uppercase">
              The <br/><span className="text-orange-600">Rat</span> <br/>Poison.
            </h2>

            {/* 实时数据网格 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-none relative overflow-hidden group">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Bitcoin (BTC)</p>
                <p className="text-3xl font-black font-mono tracking-tighter">${cryptoData?.bitcoin?.usd.toLocaleString()}</p>
                <div className={`text-xs font-bold mt-1 ${cryptoData?.bitcoin?.usd_24h_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                   {cryptoData?.bitcoin?.usd_24h_change.toFixed(2)}%
                </div>
                <Layers className="absolute -bottom-2 -right-2 opacity-5 text-slate-900 group-hover:scale-110 transition-transform" size={60} />
              </div>

              <div className="p-6 bg-slate-50 border border-slate-100 rounded-none">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 font-mono leading-none">Dogecoin (DOGE)</p>
                <p className="text-3xl font-black font-mono tracking-tighter">${cryptoData?.dogecoin?.usd.toFixed(4)}</p>
                <div className="text-xs font-bold mt-1 text-green-600">VIBRANT</div>
              </div>
            </div>

            {/* 马斯克言论打字机效果 */}
            <div className="bg-black text-white p-6 rounded-none relative">
              <Twitter size={20} className="text-blue-400 mb-4" />
              <AnimatePresence mode='wait'>
                <motion.p 
                  key={muskQuote}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-lg font-mono font-bold leading-tight"
                >
                  "{muskQuote}"
                </motion.p>
              </AnimatePresence>
              <div className="mt-4 flex gap-4 opacity-40 text-[10px] font-mono">
                <span className="flex items-center gap-1"><Repeat size={10}/> 42.0K</span>
                <span className="flex items-center gap-1"><Activity size={10}/> 6.9M Views</span>
              </div>
            </div>
          </div>

          <button className="mt-20 w-full py-4 bg-orange-600 text-white font-black text-sm uppercase tracking-widest hover:bg-black transition-colors shadow-2xl">
            Exit the Matrix
          </button>
        </div>
      </section>
    </div>
  );
}