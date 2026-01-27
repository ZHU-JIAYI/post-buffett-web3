"use client";
import React from 'react';
import { Activity, Terminal, Skull, ChevronRight, Link2Off, BrainCircuit } from 'lucide-react';
import UnifiedFooter from '../../UnifiedFooter';

export default function FailureLogsPage() {
  const failures = [
    {
      id: "ERR_BITCOIN_001",
      target: "BITCOIN / DIGITAL GOLD",
      fault: "RAT POISON SQUARED",
      loss: "∞ OPPORTUNITY COST",
      logic: "PURE NGMI ENERGY. MISTOOK A DECENTRALIZED SETTLEMENT LAYER FOR 'FINANCIAL TRASH'. IMAGINE CALLING THE TOP-PERFORMING ASSET OF THE CENTURY 'POISON' WHILE CLUTCHING DEPRECIATING FIAT. HFSP.",
      status: "",
      isCritical: true 
    },
    {
      id: "ERR_TECH_002",
      target: "BIG TECH (GOOGLE/AMAZON)",
      fault: "CIRCLE_OF_COMPETENCE_LIMIT",
      loss: "$150B+ INVISIBLE DEBT",
      logic: "STUCK IN THE 20TH-CENTURY 'PHYSICAL MOAT' PROTOCOL. FAILED TO SYNC WITH NETWORK EFFECTS AND CLOUD LEVERAGE. THE SYSTEM PARSES RAILROADS, NOT THE TOTALITARIAN SCALE OF SOFTWARE PLATFORMS.",
      status: ""
    },
    {
      id: "ERR_EXIT_003",
      target: "APPLE (2020 PARTIAL SELL)",
      fault: "EARLY_EXIT_SYNDROME",
      loss: "$30B+ ALPHA LEAK",
      logic: "PAPER HANDS DETECTED. LIQUIDATED THE ECOSYSTEM WHILE THE WALLED GARDEN WAS STILL IN THE EXPANSION PHASE. EVEN THE ORACLE GETS SPOOKED BY THE VOLATILITY HE CLAIMS TO IGNORE.",
      status: ""
    }
  ];

  return (
    <main className="min-h-screen bg-[#fffcf9] pt-24 flex flex-col items-center text-[#111111]">
      <div className="w-full max-w-5xl flex flex-col flex-grow px-6 md:px-12">
        
        {/* Header: Back to Vibrant Orange */}
        <header className="mb-24 border-b-4 border-black pb-10">
          <h1 className="text-6xl md:text-[100px] font-black uppercase tracking-tighter leading-none mb-6">
            FAILURE <span className="text-[#ff751f]">LOGS</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 max-w-lg">
            Deconstructing legacy blindspots. When the oracle fails to parse the new world order, the system logs a fatal exception.
          </p>
        </header>

        {/* Failure List */}
        <div className="space-y-16 mb-24">
          {failures.map((item, index) => (
            <div 
              key={index} 
              className={`group relative flex flex-col gap-6 p-8 border-2 ${item.isCritical ? 'border-[#ff751f] bg-[#ff751f]/5' : 'border-black'} transition-all hover:-translate-y-1 shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#ff751f]`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] font-black bg-[#ff751f] text-white px-2 py-1">
                    {item.id}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">
                    {item.status}
                  </span>
                </div>
                {item.isCritical && <Skull size={18} className="text-[#ff751f]" />}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[9px] font-black opacity-30 mb-1">TARGET_ENTITY</h4>
                  <p className="text-3xl font-black italic tracking-tighter uppercase">{item.target}</p>
                </div>
                <div>
                  <h4 className="text-[9px] font-black opacity-30 mb-1">VALUE_MISSED</h4>
                  <p className="text-3xl font-black text-[#ff751f] tracking-tighter uppercase">{item.loss}</p>
                </div>
              </div>

              <div className="bg-black text-white p-6 relative">
                <div className="flex items-center gap-2 mb-2 text-[#ff751f]">
                  <Link2Off size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#ff751f]">Post_Mortem_Analysis</span>
                </div>
                <p className="text-xs font-mono leading-relaxed uppercase tracking-tight text-white/80">
                  {item.logic}
                </p>
              </div>
              
              <div className="text-[9px] font-black opacity-20 italic">
                HISTORICAL_CONTEXT: "{item.fault}"
              </div>
            </div>
          ))}
        </div>

        {/* System Reflection Section: Centered Version */}
        <section className="mb-32 p-10 bg-black text-white relative overflow-hidden">
          <BrainCircuit className="absolute -right-10 -bottom-10 opacity-10 text-white" size={240} />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-8 w-full max-w-2xl">
              <div className="h-px flex-grow bg-white/20"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#ff751f]">Core_Reflection</span>
              <div className="h-px flex-grow bg-white/20"></div>
            </div>

            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 italic leading-none text-center">
              Legacy <span className="text-[#ff751f]">vs</span> Digital
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm leading-relaxed text-center md:text-left max-w-4xl">
              <div className="space-y-4 font-bold uppercase tracking-tight opacity-70">
                <p>
                  The Buffett system was optimized for physical certainty: soda recipes, railway tracks, and insurance float. It was the peak of 20th-century value architecture.
                </p>
                <p>
                  However, in the digital realm, value is no longer a linear cash-flow projection. It is encoded via decentralized consensus and programmatic scarcity.
                </p>
              </div>
              <div className="space-y-4 font-bold uppercase tracking-tight text-[#ff751f]">
                <p>
                  Mockery is easy, but we must acknowledge: while he was 'fatally wrong' on Crypto, his obsession with the 'Margin of Safety' protected him from every Ponzi scheme in history.
                </p>
                <p>
                  OUR TASK: Don't just kill the old gods. Reverse-engineer their discipline and migrate it to the chain. In the digital wilderness, we still need cold-blooded valuation.
                </p>
              </div>
            </div>
            
            <div className="mt-16 w-full flex justify-between items-end border-t border-white/10 pt-8">
              <div className="text-[10px] font-black opacity-40 uppercase tracking-widest">
                Protocol: Post_Buffett
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-[#ff751f]"></div>
                <div className="w-2 h-2 bg-[#ff751f]/50"></div>
                <div className="w-2 h-2 bg-white"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Unified Footer */}
        <div className="mb-20">
          <UnifiedFooter showBack={true} />
        </div>
      </div>
    </main>
  );
}