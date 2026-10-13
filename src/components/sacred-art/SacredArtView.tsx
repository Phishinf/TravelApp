import React from 'react';
import { sacredArtData } from '../../data/sacredArtData';
import { 
  Palette, 
  Sparkles, 
  Eye, 
  BookOpen, 
  ShieldCheck, 
  Scroll, 
  Sun,
  Flame
} from 'lucide-react';

export const SacredArtView: React.FC = () => {
  const artData = sacredArtData[0]; // Byzantine Iconography encyclopedia data

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Title Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
            聖像畫小百科：東正教視覺神學 (Sacred Icons &amp; Byzantine Christian Art)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          深入希臘修道院與拜占庭大教堂必讀：理解「色彩神學」與「通往天堂之窗」的靈修象徵
        </p>
      </div>

      {/* Hero Theological Manifesto Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-900/50 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500 text-slate-950 font-mono">
            {artData.historicalPeriod}
          </span>
          <span className="text-xs text-amber-400 font-serif">
            {artData.titleEn}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
          {artData.titleZh}
        </h3>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-serif">
          {artData.leadSummary}
        </p>

        {/* Councils Badge */}
        {artData.historicalCouncils && (
          <div className="pt-2 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-400 font-semibold">核心大公會議決議:</span>
            {artData.historicalCouncils.map((c, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-amber-300 font-mono"
              >
                📜 {c}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Key Theological & Historical Points Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          聖像畫歷史演進與神學要義 (Core Theological Principles)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {artData.keyPoints.map((point, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-700/60 shadow-md space-y-2.5 transition"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-amber-950 border border-amber-700 text-amber-300 text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <h4 className="text-sm font-bold text-slate-100">
                  {point.heading}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-8">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Symbolism Decoding Guide */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-slate-100">
              聖像畫視覺符號與色彩解碼指南 (Visual Symbolism Decoder)
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            走進希臘教堂時的解讀密碼
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {artData.symbolisms.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-900/50 space-y-1.5 transition"
            >
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <h4 className="text-xs font-bold text-amber-300">{item.symbol}</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-serif">
                {item.meaning}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Practical Pilgrimage Tip */}
      <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-900/40 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-slate-300 leading-relaxed">
          <span className="font-bold text-amber-300 block">朝聖參訪希臘東正教堂禮儀提醒:</span>
          東正教信徒在瞻仰聖像時會行十字聖號並親吻聖像邊緣（Veneration / 敬禮），代表尊崇畫中所表徵的基督或聖徒原型，而非敬拜木板或顏料本身。作為福音派巡禮者，可以抱持尊重與學術靈修的心情，默想道成肉身、福音廣傳與歷代殉道見證。
        </div>
      </div>
    </div>
  );
};
