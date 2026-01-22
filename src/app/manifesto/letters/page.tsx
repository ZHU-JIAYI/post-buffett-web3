"use client";
import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import UnifiedFooter from './UnifiedFooter';

export default function LettersPage() {
  const years = Array.from({ length: 2024 - 1977 + 1 }, (_, i) => 2024 - i);

  // Database of annual core logic (Summarized in one sentence each)
  const getSummary = (year: number) => {
    const db: { [key: number]: string } = {
      2023: "Record $157B cash hoard while mourning the loss of Charlie Munger.",
      2022: "Dismissed Bitcoin as non-productive while praising the resilience of American infrastructure.",
      2021: "Acknowledged the mistake of selling Apple shares too early and criticized SPAC mania.",
      2020: "Liquidated all airline stakes during the pandemic bottom, doubting long-term recovery.",
      2019: "Focused on the 'Power of Retained Earnings' and the difficulty of finding big acquisitions.",
      2018: "Criticized the volatility of crypto and highlighted the long-term tax advantages of equity.",
      2017: "Explaining the impact of the US Tax Cuts and Jobs Act on Berkshire's book value.",
      2016: "Heavy investment into Apple begins, shifting away from purely 'industrial' moats.",
      2015: "Reflecting on 50 years of Berkshire and the importance of decentralized management.",
      2014: "The famous 'Rat Poison' year: Formalizing the rejection of decentralized digital assets.",
      2013: "Praising the performance of GEICO and the long-term 'American Tailwind'.",
      2012: "Defending the decision not to pay dividends in favor of capital reinvestment.",
      2011: "First major entry into IBM, marking a significant (and later failed) tech pivot.",
      2010: "Finalizing the BNSF acquisition: The massive bet on US rail and physical logistics.",
      2009: "Navigating the aftermath of the GFC and the wisdom of 'Buying American'.",
      2008: "The Global Financial Crisis: 'Be greedy when others are fearful' in full action.",
      2007: "Warning about the housing bubble and the complexity of derivative 'time bombs'.",
      2006: "Announced the historic plan to donate the majority of wealth to the Gates Foundation.",
      2005: "Warning about the US trade deficit and its long-term impact on the Dollar.",
      2004: "Analysis of the insurance 'hard market' and the discipline of walking away from bad deals.",
      2003: "Criticizing the ethics of executive compensation and mutual fund scandals.",
      2002: "Labeling derivatives as 'Financial Weapons of Mass Destruction'.",
      2001: "Assessing the 9/11 impact on insurance and the necessity of 'Terrorism Risk' pricing.",
      2000: "The Dot-com crash: Proof that 'Value' wins when the 'New Era' hype fades.",
      1999: "The peak of the tech bubble: Standing firm on the 'Circle of Competence' despite criticism.",
      1998: "Acquisition of General Re and the focus on 'Float' as the engine of growth.",
      1997: "Heavy investment in Silver and the critique of overly aggressive accounting practices.",
      1996: "The launch of Class B shares to stop the creation of 'Unit Trusts'.",
      1995: "Acquisition of GEICO and the power of low-cost distribution models.",
      1994: "A masterclass on 'Opportunity Cost' and why cash is a call option on a new future.",
      1993: "The power of Brand Equity: Deep dive into the Coca-Cola and Gillette 'Moats'.",
      1992: "Defining 'Intrinsic Value' vs. 'Book Value' for the modern era.",
      1991: "Navigating the Salomon Brothers scandal and the importance of corporate reputation.",
      1990: "Closing the Buffett Partnership era's ghost and focusing on permanent capital.",
      1989: "Formalized the 'Moat' philosophy: Identifying unbreachable economic castles.",
      1988: "The massive initial stake in Coca-Cola: Investing in 'The Inevitables'.",
      1987: "The Black Monday crash: Demonstrating the value of permanent capital during panic.",
      1986: "Defining 'Owner Earnings' as the only metric that truly matters for long-term holders.",
      1985: "Shutting down the textile mill: A painful lesson in the 'Sunk Cost' fallacy.",
      1984: "The 'Graham-and-Doddsville' manifesto: Proving value investing is not luck.",
      1983: "The acquisition of Nebraska Furniture Mart: Betting on 'Mrs. B' and local monopolies.",
      1982: "Analysis of the 'Economic Goodwill' and why it's better than tangible assets.",
      1981: "Navigating high-inflation environments by owning businesses with pricing power.",
      1980: "The rise of the insurance float and its role as 'free' leverage for acquisitions.",
      1979: "The decade of high inflation ends: Re-emphasizing Return on Equity (ROE).",
      1978: "Integrating Wesco Financial and the strengthening partnership with Charlie Munger.",
      1977: "The early doctrine: Setting the rules for disciplined capital allocation."
    };
    return db[year] || "Documenting the transition from Graham's 'Cigarette Butts' to quality franchises.";
  };

  return (
    <div className="min-h-screen pb-20 pt-24 px-4 md:px-12 bg-white text-[#111111] font-sans selection:bg-[#ff751f] selection:text-white">
      <main className="max-w-5xl mx-auto">
        {/* Back Navigation */}
        <nav className="mb-16">
          <Link href="/manifesto" className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] border-b-2 border-black pb-1 hover:text-[#ff751f] hover:border-[#ff751f] transition-all">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> 
            Return to Dockets
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-20">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none">
            THE <span className="text-[#ff751f]">LETTERS</span>
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <p className="max-w-md text-xs font-bold uppercase leading-relaxed opacity-60 tracking-widest">
              An exhaustive archive of annual shareholder communications from the Omaha Node (1977-2024). 
              Each entry represents a core pillar of legacy capital logic.
            </p>
            <div className="text-[10px] font-black border-l-2 border-[#ff751f] pl-4 italic">
              TOTAL RECORDS: {years.length} <br/>
              STATUS: PUBLIC DOMAIN
            </div>
          </div>
        </header>

        {/* Clean List */}
        <div className="border-t-4 border-black">
          {years.map(year => (
            <a 
              key={year}
              href={`https://www.berkshirehathaway.com/letters/${year}ltr.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col md:flex-row md:items-center py-6 border-b border-black/10 hover:bg-[#fffcf9] transition-all"
            >
              <div className="w-24 md:w-40 flex-shrink-0 font-mono text-3xl font-black tracking-tighter mb-2 md:mb-0">
                {year}
              </div>
              <div className="flex-1 text-sm md:text-lg font-bold tracking-tight pr-8 leading-tight">
                {getSummary(year)}
              </div>
              <div className="mt-4 md:mt-0 opacity-20 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={18} />
              </div>
            </a>
          ))}
        </div>

        {/* Final Remark */}
        <UnifiedFooter showBack={true} />
      </main>
    </div>
  );
}
