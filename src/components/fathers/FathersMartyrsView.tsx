import React, { useState } from 'react';
import { FatherMartyr } from '../../types';
import { fathersMartyrsData } from '../../data/fathersMartyrsData';
import { 
  Users, 
  ShieldCheck, 
  Flame, 
  BookOpen, 
  Scroll, 
  Quote, 
  Sparkles,
  Calendar
} from 'lucide-react';

export const FathersMartyrsView: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const [activeFigureModal, setActiveFigureModal] = useState<FatherMartyr | null>(null);

  const filteredFigures = fathersMartyrsData.filter((figure) => {
    return filterType === 'all' || figure.type === filterType;
  });

  const getTypeBadge = (type: FatherMartyr['type']) => {
    switch (type) {
      case 'apostolic-father':
        return {
          label: '使徒教父 (Apostolic Father)',
          color: 'bg-amber-950 text-amber-300 border-amber-800/60',
        };
      case 'martyr':
        return {
          label: '護教殉道烈士 (Early Martyr)',
          color: 'bg-rose-950 text-rose-300 border-rose-800/60',
        };
      case 'ante-nicene':
        return {
          label: '尼西亞前期教父 (Ante-Nicene Father)',
          color: 'bg-blue-950 text-blue-300 border-blue-800/60',
        };
      default:
        return {
          label: '早期教父',
          color: 'bg-slate-800 text-slate-300 border-slate-700',
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Title Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
            使徒教父與殉道先烈傳記 (Apostolic Fathers &amp; Early Martyrs)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          傳承使徒親授道統、捍衛正統信仰、在羅馬殘酷逼迫中以生命澆奠的初期教會信心偉人
        </p>
      </div>

      {/* Famous Quote Hero Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-amber-950/40 border border-amber-900/40 shadow-xl relative overflow-hidden">
        <Quote className="w-16 h-16 text-amber-500/10 absolute right-4 bottom-2 pointer-events-none" />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
              坡旅甲主教殉道告白 (AD 155 · 士每拿)
            </span>
          </div>
          <p className="text-sm sm:text-base font-serif italic text-amber-100 leading-relaxed max-w-4xl">
            &quot;八十六年來我一直事奉祂，祂從未虧待過我；我怎能褻瀆那位拯救我的君王救主呢？... 你用那只能燃燒片刻隨即熄滅的火嚇唬我，卻不知道那為不敬虔之人預備的永刑之火！&quot;
          </p>
          <div className="text-xs text-slate-400 font-mono">
            — 《坡旅甲殉道記》(Martyrdom of Polycarp)
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: '全部教父烈士 (All Figures)' },
          { id: 'apostolic-father', label: '使徒教父 (Apostolic Fathers)' },
          { id: 'martyr', label: '護教殉道者 (Martyrs & Apologists)' },
          { id: 'ante-nicene', label: '尼西亞前神學家 (Ante-Nicene Theologians)' },
        ].map((tab) => {
          const isSelected = filterType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-amber-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-amber-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Church Fathers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFigures.map((fig) => {
          const badge = getTypeBadge(fig.type);

          return (
            <div
              key={fig.id}
              onClick={() => setActiveFigureModal(fig)}
              className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-amber-700/60 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badge.color}`}>
                      {badge.label}
                    </span>
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition mt-2">
                      {fig.nameZh}
                    </h3>
                    <p className="text-xs text-amber-400 font-serif">
                      {fig.nameEn}
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800 text-slate-400 flex-shrink-0">
                    <Calendar className="w-4 h-4 text-amber-500" />
                  </div>
                </div>

                {/* Years & Role */}
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                  <div className="text-slate-400">
                    <span className="font-semibold text-slate-300">生卒年代:</span> {fig.years}
                  </div>
                  <div className="text-slate-400">
                    <span className="font-semibold text-slate-300">職分身份:</span> {fig.role}
                  </div>
                </div>

                {/* Historical significance */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                  {fig.historicalSignificance}
                </p>

                {/* Key Works */}
                <div className="text-xs text-amber-200/90 pt-1 border-t border-slate-800/80">
                  <span className="font-bold text-amber-400 block mb-0.5">代表著述 / 告白:</span>
                  <span className="line-clamp-2 italic font-serif">{fig.keyWorksOrConfession}</span>
                </div>
              </div>

              {/* Footer Click Indicator */}
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>{fig.quotesOrEvents.length} 則歷史事蹟與言論</span>
                <span className="text-amber-400 font-medium group-hover:translate-x-1 transition">
                  查考生平 →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Detail */}
      {activeFigureModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-amber-900/50 rounded-2xl w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-y-auto p-6 space-y-6 text-slate-200">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getTypeBadge(activeFigureModal.type).color}`}>
                  {getTypeBadge(activeFigureModal.type).label}
                </span>
                <h3 className="text-2xl font-bold text-slate-100 mt-2">
                  {activeFigureModal.nameZh} ({activeFigureModal.nameEn})
                </h3>
                <p className="text-xs text-amber-400 font-mono mt-0.5">
                  年代: {activeFigureModal.years} · 職分: {activeFigureModal.role}
                </p>
              </div>
              <button
                onClick={() => setActiveFigureModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Historical Significance */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                教會歷史重要性與神學地位
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeFigureModal.historicalSignificance}
              </p>
            </div>

            {/* Key Works */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Scroll className="w-4 h-4" />
                重要著作與神學信條
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 font-serif leading-relaxed italic">
                {activeFigureModal.keyWorksOrConfession}
              </p>
            </div>

            {/* Quotes & Events */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Quote className="w-4 h-4" />
                經典告白、金句與殉道經歷
              </h4>
              <div className="space-y-2">
                {activeFigureModal.quotesOrEvents.map((quote, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs sm:text-sm text-amber-100 font-serif italic leading-relaxed"
                  >
                    &quot;{quote}&quot;
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveFigureModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
