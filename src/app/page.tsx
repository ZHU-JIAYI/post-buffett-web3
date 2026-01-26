"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ArrowUpRight, ArrowDownRight, Zap, Quote, Ghost, Monitor } from 'lucide-react';
import Link from 'next/link';
import { span } from 'framer-motion/client';

export default function MuskStyleHome() {
  const [crypto, setCrypto] = useState<any>(null);
  const [tradAssets, setTradAssets] = useState<any[]>([]);
  //const [tweets, setTweets] = useState<any[]>([]); // 存储后端传来的推文
  const accentColor = "#ff751f";


  // 马斯克语录池
  const muskQuotes = [
    "To be clear, I am not an investor. I am an engineer. I don't believe in MOATS.",
    "Paper money is going away. Crypto is a far better way to transfer value than pieces of paper.",
    "The most entertaining outcome is the most likely.",
    "Too many smart people go into finance and law. We should have more people building things.",
    "If you don't have a moat, you have to innovate fast. That's the only thing that matters.",
    "Possessions just weigh you down. I'm selling almost all physical possessions. Will own no house.",
    "Ancient legacy systems must be replaced by high-bandwidth truth."
  ];

  const [currentQuote, setCurrentQuote] = useState(muskQuotes[0]);

  const refreshQuote = () => {
    const remaining = muskQuotes.filter(q => q !== currentQuote);
    const random = remaining[Math.floor(Math.random() * remaining.length)];
    setCurrentQuote(random);
  };

  
  // 1. 处理 X (Twitter) 脚本加载
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.setAttribute("charset", "utf-8");
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);


  // 2. 抓取加密货币数据 (含跳动逻辑)
  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        // --- 核心改动：请求你刚刚写好的后端新接口 ---
        const res = await axios.get('/api/crypto-assets');
        
        // 只有当后端返回了实际内容才更新
        if (res.data && Object.keys(res.data).length > 0) {
          setCrypto(res.data);
        }
      } catch (e) {
        console.error("Crypto Node Lost.");
      }
    };

    fetchCrypto();
    const interval = setInterval(fetchCrypto, 30000);

    // 依然保留 flicker 逻辑，因为它是在前端模拟实时跳动
    const flickerInterval = setInterval(() => {
      setCrypto((prev: any) => {
        if (!prev) return prev;
        const newCrypto = { ...prev };
        Object.keys(newCrypto).forEach(key => {
          if (newCrypto[key] && newCrypto[key].usd) {
            const basePrice = newCrypto[key].usd;
            const flicker = 1 + (Math.random() - 0.5) * 0.0001; 
            newCrypto[key].displayPrice = basePrice * flicker; 
          }
        });
        return newCrypto;
      });
    }, 1000);

    return () => { clearInterval(interval); clearInterval(flickerInterval); };
  }, []);

  // 3. 抓取 Python 后端美股数据 (已适配 Alpha Vantage)
  useEffect(() => {
    const fetchTradData = async () => {
      try {
        const res = await axios.get('/api/legacy-assets')
        setTradAssets(res.data);
      } catch (e) { console.error("Legacy Signal Lost."); }
    };
    fetchTradData();
    const interval = setInterval(fetchTradData, 60000); // 1分钟刷新一次，适配 Alpha Vantage 频率
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="pt-24 min-h-screen px-4 md:px-12 pb-20 bg-[#fffcf9] text-[#111111]">
      {/* Header */}
      <header className="border-b-2 border-[#111111] pb-10 mb-16">
        <div className="flex justify-between items-end mb-6 font-bold uppercase text-[12px] tracking-widest">
          <div className="text-[#ff751f]">Real-time Efficiency Index</div>
          <div>Post-Buffett Era // V1.0.6</div>
        </div>
        <h1 className="text-6xl md:text-[100px] font-black uppercase tracking-tighter leading-none">
          POST <span style={{ color: accentColor }}>BUFFETT</span>
        </h1>
      </header>

      {/* 中部数据展示区 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
        {/* 左侧：旧金融 */}
        <div className="lg:col-span-5 border-t-4 border-[#111111] pt-6 flex flex-col">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-10 opacity-50 italic">
            Legacy Allocation (Slow)
          </h2>
          <div className="space-y-12">
            {tradAssets.length > 0 ? tradAssets.map(s => (
              <div key={s.name} className="flex justify-between items-end border-b border-black/10 pb-4">
                <div>
                  <div className="text-2xl font-black tracking-tight">{s.name}</div>
                  <div className={`text-[10px] font-bold flex items-center gap-1 uppercase ${s.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {s.change >= 0 ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} 
                    {Math.abs(s.change)}% / {s.status}
                  </div>
                </div>
                <motion.div 
                  key={s.price}
                  initial={{ backgroundColor: s.change >= 0 ? "rgba(22, 163, 74, 0.1)" : "rgba(220, 38, 38, 0.1)" }}
                  animate={{ backgroundColor: "transparent" }}
                  className="font-mono text-xl font-bold p-1 rounded"
                >
                  {s.price === "N/A" ? "SYNCING..." : `$${s.price.toLocaleString()}`}
                </motion.div>
              </div>
            )) : <div className="font-mono text-sm animate-pulse">CONNECTING TO ALPHA_VANTAGE NODES...</div>}
          </div>
        </div>

        {/* 右侧：Web3 数据 */}
        <div className="lg:col-span-7 border-t-4 border-[#ff751f] pt-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: accentColor }}>
              The Speed of Light (Web3)
            </h2>
            <div className="flex gap-2">
              <a href="https://x.com/elonmusk" target="_blank" className="p-2 border border-black hover:bg-black hover:text-white transition-all"><X size={16}/></a>
              <a href="#" className="p-2 border border-black hover:bg-black hover:text-white transition-all"><Send size={16}/></a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {crypto ? Object.keys(crypto).map(key => (
              <div key={key} className="p-8 border-2 border-[#111111] hover:shadow-[8px_8px_0px_0px_#ff751f] transition-all bg-white relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Zap size={80} />
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-40">{key} / Reality</div>
                <div className="text-4xl font-black tracking-tighter mb-4 font-mono">
                  ${(crypto[key].displayPrice || crypto[key].usd).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div className="text-green-600 font-black flex items-center gap-1 uppercase text-[10px]">
                  <ArrowUpRight size={14} strokeWidth={3}/> {crypto[key].usd_24h_change?.toFixed(2)}% Efficiency
                </div>
              </div>
            )) : <div className="font-mono font-bold animate-pulse uppercase text-sm">Syncing with nodes...</div>}
          </div>
        </div>
      </div>

      {/* 底部交互区：语录 + CTA 并排 */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch mb-16">
        <div 
          onClick={refreshQuote}
          className="flex-1 p-8 border-2 border-[#111111] bg-white relative cursor-pointer group hover:bg-[#fff1e5] transition-colors shadow-[4px_4px_0px_0px_#111111] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
        >
          <Quote className="absolute -top-4 -left-4 bg-[#fff1e5] p-1 group-hover:rotate-12 transition-transform" size={32} />
          <div className="min-h-[100px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.p 
                key={currentQuote}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="text-xl font-bold leading-tight italic text-[#111111]"
              >
                "{currentQuote}"
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="mt-4 flex justify-between items-center border-t border-black/5 pt-4">
            <div className="text-xs font-black uppercase tracking-widest">— Elon Musk</div>
            <div className="text-[8px] font-bold opacity-30 uppercase animate-pulse italic underline">Click to Refresh Signal</div>
          </div>
        </div>

        <div className="lg:w-7/12 bg-[#111111] text-white p-10 flex flex-col md:flex-row justify-between items-center gap-8 shadow-[8px_8px_0px_0px_#ff751f]">
          <div className="max-w-xs text-center md:text-left">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-2 italic">Read the Logic</h3>
            <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 italic leading-relaxed">
              Deconstructing the 20th century finance myths. Ancient systems must be replaced.
            </p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Link href="/token" className="flex-1 md:flex-none text-center bg-white text-black px-8 py-4 font-black uppercase text-xs tracking-[0.1em] hover:bg-[#ff751f] transition-colors whitespace-nowrap">
              Tokenomics
            </Link>
            <Link href="/manifesto" className="flex-1 md:flex-none text-center bg-[#ff751f] text-black px-8 py-4 font-black uppercase text-xs tracking-[0.1em] hover:bg-white transition-colors whitespace-nowrap">
              Manifesto
            </Link>
          </div>
        </div>
      </div>

      {/* --- Elon Musk Twitter Monitor Feed --- */}
      <section className="mb-20">
        <div className="border-2 border-[#111111] bg-white shadow-[8px_8px_0px_0px_#111111]">
          <div className="bg-[#111111] text-white px-4 py-2 flex justify-between items-center">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
              <Monitor size={14} className="text-[#ff751f] animate-pulse" />
              Satellite_Link: @elonmusk_X_Feed
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#ff751f]/50"></div>
              <div className="w-2 h-2 rounded-full bg-[#ff751f]"></div>
            </div>
          </div>
          
          <div className="p-4 max-h-[500px] overflow-y-auto bg-white">
            <a 
              className="twitter-timeline" 
              data-height="450" 
              data-theme="light" 
              data-chrome="noheader nofooter noborders transparent"
              href="https://twitter.com/elonmusk?ref_src=twsrc%5Etfw"
            >
              <div className="flex flex-col items-center justify-center py-20 font-mono text-xs uppercase opacity-40 animate-pulse text-black">
                <Zap size={24} className="mb-2" />
                Establishing_Neural_Link...
              </div>
            </a>
          </div>
          <div className="border-t border-black/10 p-2 bg-[#fffcf9] text-center text-[8px] font-black uppercase opacity-30 italic">
            Direct Transmission // Starlink_V3_Active
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#111111] pt-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-[10px] font-black uppercase tracking-widest">
        <div className="opacity-40">
           © 2026 Post Buffett. INVESTING IN THE FUTURE.
        </div>
        <div className="flex flex-row gap-6 justify-center">
          <div className="flex items-center gap-2">
            <Ghost size={14} className="opacity-50"/> 
            <span>INFLATION: 100%</span>
          </div>
          <div className="flex items-center gap-2 text-[#ff751f]">
            <Zap size={14}/> 
            <span>RAT_POISON: LETHAL</span>
          </div>
        </div>
        <div className="flex justify-end gap-6">
          <Link href="/manifesto" className="hover:text-[#ff751f] transition-colors underline">Manifesto</Link>
          <Link href="/token" className="hover:text-[#ff751f] transition-colors underline">Tokenomics</Link>
        </div>
      </footer>
    </main>
  );
}