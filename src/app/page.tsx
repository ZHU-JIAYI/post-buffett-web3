"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, TrendingUp, Twitter, Cpu, Database, Skull } from 'lucide-react';

export default function IronyDashboard() {
  const [prices, setPrices] = useState({ btc: 0, btc24h: 0 });
  const [loading, setLoading] = useState(true);

  // 1. 获取真实 BTC 价格 (CoinGecko)
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
        setPrices({
          btc: res.data.bitcoin.usd,
          btc24h: res.data.bitcoin.usd_24h_change
        });
        setLoading(false);
      } catch (e) {
        console.error("API Error", e);
      }
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); // 每一分钟更新一次真实价格
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* 顶部警告条：增加反讽感 */}
      <div className="bg-red-600 text-black py-1 px-4 text-center font-black text-xs uppercase tracking-[0.5em]">
        Warning: You are entering a zone of "Financial Weapons of Mass Destruction"
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]">
        
        {/* 左侧：巴菲特的“博物馆” (老派、枯燥、讽刺) */}
        <section className="bg-[#111] p-12 border-r border-red-900/30 flex flex-col justify-center relative">
          <div className="absolute top-10 left-10 opacity-20"><Skull size={100} /></div>
          <div className="relative z-10">
            <h2 className="text-red-600 font-mono mb-4 text-sm tracking-widest uppercase">The Omaha Museum of Obsolete Ideas</h2>
            <blockquote className="text-4xl md:text-6xl font-serif italic leading-tight text-gray-500">
              "Bitcoin is probably <span className="text-red-800 line-through">rat poison squared</span>."
            </blockquote>
            <p className="mt-8 text-gray-600 font-mono">— Warren B., Missing the greatest bull run in history.</p>
            
            <div className="mt-20 p-6 border border-gray-800 bg-black/50">
              <p className="text-xs uppercase text-gray-500 mb-2">Portfolio Suggestion:</p>
              <p className="text-xl font-serif text-gray-400">Buy more sugar water and 20th-century banks.</p>
            </div>
          </div>
        </section>

        {/* 右侧：马斯克与 Web3 的“狂热现场” (真实数据、跳动、鲜艳) */}
        <section className="p-12 flex flex-col justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-black to-black">
          <div className="max-w-md mx-auto w-full">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-12 w-12 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <TrendingUp color="black" />
              </div>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter">The Reality Squared</h2>
            </div>

            {/* 真实价格卡片 */}
            <div className="mb-12">
              <p className="text-orange-500 font-mono text-xs uppercase mb-2 flex items-center gap-2">
                <Database size={14} /> Real-Time Rat Poison Price
              </p>
              <div className="text-7xl md:text-8xl font-black tracking-tighter text-white">
                ${loading ? "LOADING" : prices.btc.toLocaleString()}
              </div>
              <div className={`text-2xl font-mono mt-2 ${prices.btc24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {prices.btc24h >= 0 ? '+' : ''}{prices.btc24h.toFixed(2)}% <span className="text-xs text-gray-500">(LAST 24H)</span>
              </div>
            </div>

            {/* 马斯克言论卡片 (Twitter 风格) */}
            <div className="bg-[#1DA1F2]/10 border border-[#1DA1F2]/30 p-6 rounded-2xl backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold">X</div>
                <div>
                  <p className="font-bold text-sm">Elon Musk <span className="text-blue-400">@elonmusk</span></p>
                  <p className="text-[10px] text-gray-500">Real-time signal</p>
                </div>
                <Twitter className="ml-auto text-[#1DA1F2]" size={20} />
              </div>
              <p className="text-lg leading-snug">
                "Fate loves irony. The most entertaining outcome is often the most likely." 🚀
              </p>
              <div className="mt-4 flex gap-6 text-[10px] font-bold text-gray-500 uppercase">
                <span>Retweets: 420K</span>
                <span>Likes: 6.9M</span>
              </div>
            </div>

            <button className="w-full mt-10 py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-orange-500 transition-all transform hover:scale-105">
              Enter the Post-Buffett Future
            </button>
          </div>
        </section>
      </div>

      {/* 底部滚动条 */}
      <footer className="fixed bottom-0 w-full bg-orange-600 overflow-hidden py-1 whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 text-black font-black text-xs uppercase"
        >
          {[1,2,3,4,5].map(i => (
            <span key={i}>Decentralization is inevitable • Fiat is a bubble • In Code We Trust • Exit the System</span>
          ))}
        </motion.div>
      </footer>
    </div>
  );
}