"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, TrendingDown, ShieldAlert, Activity, Newspaper, Wallet, ArrowUpRight } from 'lucide-react';

export default function PostBuffettPro() {
  const [prices, setPrices] = useState({ btc: 0, btcChange: 0, brka: 615430, gas: 0 });
  const [onChainLogs, setOnChainLogs] = useState<{id: number, msg: string}[]>([]);

  // 1. 模拟实时行情与 Gas 费 (生产环境替换为 CoinGecko/Alchemy API)
  useEffect(() => {
    const timer = setInterval(() => {
      setPrices(prev => ({
        ...prev,
        btc: 65000 + Math.random() * 100,
        btcChange: 2.45 + Math.random(),
        gas: Math.floor(15 + Math.random() * 10)
      }));

      // 模拟实时链上日志
      const newLog = { 
        id: Date.now(), 
        msg: `Whale moved ${Math.floor(Math.random() * 500)} ETH to Unknown Wallet` 
      };
      setOnChainLogs(prev => [newLog, ...prev.slice(0, 4)]);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1a1a1a] font-serif selection:bg-orange-500 selection:text-white">
      {/* --- 顶部装饰线 --- */}
      <div className="h-2 bg-slate-900 w-full" />

      {/* --- Header: 品牌冲突美学 --- */}
      <header className="max-w-7xl mx-auto px-6 py-12 border-b-4 border-double border-slate-900 text-center relative overflow-hidden">
        <div className="flex justify-between items-center text-[10px] font-sans font-black uppercase tracking-[0.3em] mb-6">
          <span className="bg-slate-900 text-white px-2 py-0.5">EST. 2009</span>
          <span className="hidden md:block italic text-slate-500 uppercase">"What the Oracle of Omaha is missing"</span>
          <span className="flex items-center gap-2"><Activity size={12} className="text-orange-600"/> NETWORK: MAINNET</span>
        </div>
        
        <h1 className="text-7xl md:text-[120px] font-black tracking-tighter leading-none mb-4 uppercase italic">
          POST<span className="text-orange-600 not-italic">BUFFETT</span>
        </h1>
        
        <div className="flex justify-center gap-8 font-sans font-bold text-xs border-y border-slate-300 py-3 mt-8">
          <span className="flex items-center gap-1 text-green-700">BTC +{(prices.btcChange).toFixed(2)}%</span>
          <span className="text-slate-400">|</span>
          <span className="flex items-center gap-1">GAS: {prices.gas} GWEI</span>
          <span className="text-slate-400">|</span>
          <span className="flex items-center gap-1 text-slate-500 uppercase">BRK.A: $615,430 (STABLE)</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* --- 左侧：Anti-Buffett News (新闻聚合板块) --- */}
        <section className="lg:col-span-8">
          <h2 className="flex items-center gap-2 text-3xl font-black uppercase mb-8 border-b-2 border-slate-900 pb-2">
            <Newspaper size={28} /> Front Page Analysis
          </h2>
          
          <div className="space-y-12">
            <article className="group cursor-pointer">
              <span className="font-sans font-bold text-orange-600 text-xs uppercase tracking-widest">Decentralized Value</span>
              <h3 className="text-4xl font-bold mt-2 leading-tight group-hover:underline">
                Why "Intrinsic Value" is a 20th Century Relic.
              </h3>
              <p className="mt-4 text-slate-600 leading-relaxed text-lg">
                The Oraphle of Omaha famously called Bitcoin "Rat Poison Squared". Today, that poison has built a $3T financial ecosystem that doesn't need a central custodian.
              </p>
              <div className="mt-4 flex items-center gap-4 text-sm font-sans font-bold">
                <span>5 MIN READ</span>
                <span className="text-slate-300">/</span>
                <span className="hover:text-orange-600 flex items-center gap-1">READ STORY <ArrowUpRight size={14}/></span>
              </div>
            </article>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
              <div className="p-4 border border-slate-300 hover:border-orange-500 transition-colors">
                <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">Yield Watch</span>
                <h4 className="font-bold text-xl mt-1">Aave V3 Real-time APY exceeds traditional T-Bills.</h4>
              </div>
              <div className="p-4 border border-slate-300 hover:border-orange-500 transition-colors">
                <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">RWA Update</span>
                <h4 className="font-bold text-xl mt-1">Tokenizing the World: Is Coca-Cola next on-chain?</h4>
              </div>
            </div>
          </div>
        </section>

        {/* --- 右侧：The "Rat Poison" Ticker (实时数据与交互) --- */}
        <aside className="lg:col-span-4 space-y-8">
          {/* 实时点卡片 */}
          <div className="bg-slate-900 text-white p-6 shadow-[8px_8px_0px_0px_rgba(249,115,22,1)]">
            <h3 className="font-sans font-black uppercase text-sm mb-6 flex items-center justify-between border-b border-slate-700 pb-2">
              Rat Poison Ticker <Zap size={16} className="text-orange-500 fill-orange-500" />
            </h3>
            <div className="space-y-6">
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-sans font-bold tracking-widest">Bitcoin (BTC)</p>
                <p className="text-4xl font-mono font-bold">${prices.btc.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
              </div>
              <div className="pt-4 border-t border-slate-800">
                <p className="text-slate-400 text-[10px] uppercase font-sans font-bold tracking-widest">Berkshire (BRK.A)</p>
                <p className="text-2xl font-mono font-bold text-slate-500">${prices.brka.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* On-chain Oracle (链上高度) */}
          <div className="border-2 border-slate-900 p-6 bg-white relative">
            <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-sans font-bold px-2 py-1 rotate-12">
              LIVE DATA
            </div>
            <h3 className="font-sans font-black uppercase text-sm mb-4">On-chain Oracle</h3>
            <div className="space-y-3">
              <AnimatePresence mode='popLayout'>
                {onChainLogs.map((log) => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="text-[11px] font-mono leading-tight p-2 bg-slate-50 border-l-2 border-slate-900 flex justify-between"
                  >
                    <span className="truncate mr-2">{log.msg}</span>
                    <span className="text-slate-400 shrink-0">NOW</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Wallet Interaction */}
          <button className="w-full bg-orange-600 text-white font-sans font-black py-4 hover:bg-slate-900 transition-all flex justify-center items-center gap-3 shadow-xl">
            <Wallet size={20} /> CONNECT WALLET
          </button>
        </aside>
      </main>

      <footer className="mt-20 border-t-2 border-slate-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
            © 2026 POSTBUFFETT.COM — NO ORACLES, JUST CODE.
          </p>
          <div className="flex gap-6 text-xs font-sans font-black uppercase">
            <a href="#" className="hover:text-orange-600 transition-colors">Whitepaper</a>
            <a href="#" className="hover:text-orange-600 transition-colors">X / Twitter</a>
            <a href="#" className="hover:text-orange-600 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
