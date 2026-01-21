"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Zap, BarChart3, Rocket, Globe, Terminal } from 'lucide-react';

export default function ComparisonDashboard() {
  const [prices, setPrices] = useState({ btc: 65230, aapl: 189.45, gas: 21 });
  const [logs, setLogs] = useState<{id: number, text: string, side: 'old' | 'new'}[]>([]);

  // 模拟数据实时波动
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(p => ({
        btc: p.btc + (Math.random() - 0.5) * 50,
        aapl: p.aapl + (Math.random() - 0.5) * 0.5,
        gas: Math.floor(15 + Math.random() * 15)
      }));

      // 随机生成两边的交易日志
      const isNew = Math.random() > 0.5;
      const newLog = {
        id: Date.now(),
        side: isNew ? 'new' as const : 'old' as const,
        text: isNew ? `TX: 0x${Math.random().toString(16).slice(2,8)} swapped 100 ETH` : `TRADE: Institutional Buy 50,000 AAPL`
      };
      setLogs(prev => [newLog, ...prev.slice(0, 5)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full overflow-hidden">
      
      {/* --- 左侧：巴菲特派 (Traditional) --- */}
      <section className="flex-1 bg-[#F5F2E9] p-8 border-b-8 lg:border-b-0 lg:border-r-4 border-slate-900 overflow-y-auto">
        <div className="max-w-xl mx-auto">
          <header className="border-b-2 border-slate-900 pb-4 mb-8">
            <h2 className="font-serif text-xs font-bold tracking-[0.3em] uppercase text-slate-500 mb-2">The Value Investor</h2>
            <h1 className="font-serif text-5xl font-black uppercase tracking-tighter">The Old Guard</h1>
          </header>

          {/* 巴菲特语录 */}
          <div className="bg-white p-6 border border-slate-300 shadow-sm mb-10 italic font-serif text-slate-700 relative">
            <Quote className="absolute -top-3 -left-3 text-slate-200" size={40} />
            "Price is what you pay. Value is what you get. Derivatives are financial weapons of mass destruction."
            <footer className="text-right mt-2 font-bold">— Warren Buffett</footer>
          </div>

          {/* 传统资产行情 */}
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-slate-300 pb-2">
              <span className="font-serif font-bold text-xl uppercase italic text-slate-600">AAPL / Apple Inc.</span>
              <span className="font-mono text-2xl font-bold">${prices.aapl.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-end border-b border-slate-300 pb-2">
              <span className="font-serif font-bold text-xl uppercase italic text-slate-600">KO / Coca-Cola</span>
              <span className="font-mono text-2xl font-bold">$62.14</span>
            </div>
          </div>

          {/* 传统交易流水 */}
          <div className="mt-12 bg-[#EAE7DD] p-4 font-serif text-xs uppercase tracking-wider">
            <h3 className="font-black mb-4 flex items-center gap-2"><BarChart3 size={14}/> Wall Street Tape</h3>
            <div className="space-y-2 opacity-70">
              {logs.filter(l => l.side === 'old').map(l => <div key={l.id}>{l.text}</div>)}
            </div>
          </div>
        </div>
      </section>

      {/* --- 右侧：Web3/马斯克派 (Cyber) --- */}
      <section className="flex-1 bg-slate-950 p-8 text-green-400 overflow-y-auto relative">
        <div className="max-w-xl mx-auto">
          <header className="border-b-2 border-green-900 pb-4 mb-8">
            <h2 className="font-mono text-xs font-bold tracking-[0.3em] uppercase text-green-800 mb-2">The Digital Frontier</h2>
            <h1 className="font-mono text-5xl font-black uppercase tracking-tighter text-white">Post Buffett</h1>
          </header>

          {/* KOL/马斯克语录 */}
          <div className="bg-green-950/30 border border-green-500/30 p-6 mb-10 font-mono text-sm relative overflow-hidden group">
            <motion.div 
               animate={{ opacity: [0.5, 1, 0.5] }} 
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute top-0 right-0 p-2 text-[10px] bg-green-500 text-black font-black"
            >
              SIGNAL
            </motion.div>
            <span className="text-white">@elonmusk:</span> "To the moon! 🚀 Tesla will likely accept Doge again. Traditional fiat is just a slow, centralized database."
          </div>

          {/* Web3 资产行情 */}
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-green-900 pb-2">
              <span className="font-mono font-bold text-xl uppercase text-green-700 flex items-center gap-2">
                <Zap size={18} fill="currentColor"/> BTC / Bitcoin
              </span>
              <span className="font-mono text-2xl font-bold text-white">${prices.btc.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
            </div>
            <div className="flex justify-between items-end border-b border-green-900 pb-2">
              <span className="font-mono font-bold text-xl uppercase text-green-700 flex items-center gap-2">
                <Globe size={18}/> Gas Price
              </span>
              <span className="font-mono text-2xl font-bold text-white">{prices.gas} GWEI</span>
            </div>
          </div>

          {/* 链上大单监控 */}
          <div className="mt-12 bg-black border border-green-900 p-4 font-mono text-[10px]">
            <h3 className="font-black mb-4 flex items-center gap-2 text-green-500"><Terminal size={14}/> REAL-TIME ON-CHAIN LOGS</h3>
            <div className="space-y-2">
              <AnimatePresence>
                {logs.filter(l => l.side === 'new').map(l => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={l.id}
                    className="flex items-center gap-2"
                  >
                    <span className="text-white">{'>'}</span> {l.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          <button className="w-full mt-10 border-2 border-green-500 py-4 font-mono font-black hover:bg-green-500 hover:text-black transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
            <Rocket size={18}/> JOIN THE FUTURE
          </button>
        </div>
      </section>
    </div>
  );
}