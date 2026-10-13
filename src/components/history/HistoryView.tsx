import React, { useState } from 'react';
import { HistoricalTopic } from '../../types';
import { historyEncyclopediaData } from '../../data/historyEncyclopediaData';
import { 
  Scroll, 
  BookOpen, 
  Crown, 
  Landmark, 
  Globe2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  Clock,
  Compass
} from 'lucide-react';

export const HistoryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(historyEncyclopediaData[0].id);

  const categories = [
    { id: 'all', label: '全部主題 (All Topics)', icon: Scroll },
    { id: 'greek-culture', label: '古希臘文化 (Greek Culture)', icon: BookOpen },
    { id: 'polis', label: '城邦制度 (Greek Polis)', icon: Landmark },
    { id: 'hellenistic', label: '希臘化時期 (Hellenistic Era)', icon: Globe2 },
    { id: 'roman-emperors', label: '羅馬皇帝與帝國 (Roman Emperors)', icon: Crown },
  ];

  const filteredTopics = historyEncyclopediaData.filter((topic) => {
    return selectedCategory === 'all' || topic.category === selectedCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedTopicId(expandedTopicId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Title Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Scroll className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
            歷史文化小百科 (Greco-Roman Biblical History Encyclopedia)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          涵蓋古希臘文明、城邦制度、亞歷山大希臘化擴張與羅馬帝國歷任皇帝統治背景，理解福音降臨的歷史土壤
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition cursor-pointer whitespace-nowrap flex-shrink-0 ${
                isSelected
                  ? 'bg-amber-600 text-white font-semibold shadow-sm shadow-amber-950'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-amber-200 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Topics List */}
      <div className="space-y-6">
        {filteredTopics.map((topic) => {
          const isExpanded = expandedTopicId === topic.id;

          return (
            <div
              key={topic.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-700/50 rounded-2xl overflow-hidden shadow-lg transition"
            >
              {/* Collapsible Card Header */}
              <div
                onClick={() => toggleExpand(topic.id)}
                className="p-5 sm:p-6 bg-slate-900/90 hover:bg-slate-850 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 transition"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-800/60 font-mono">
                      {topic.period}
                    </span>
                    <span className="text-xs text-slate-400 font-serif">
                      {topic.titleEn}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-100">
                    {topic.titleZh}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                    {topic.leadSummary}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center flex-shrink-0">
                  <span className="text-xs text-amber-400 font-medium hidden sm:inline">
                    {isExpanded ? '收起專題' : '展開深度考證'}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-800 text-slate-300">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Content Details */}
              {isExpanded && (
                <div className="p-5 sm:p-6 border-t border-slate-800/80 bg-slate-950/40 space-y-6 animate-in fade-in duration-200">
                  {/* Scriptural Connection Box (Important for Guidebook Context) */}
                  {topic.scripturalConnection && (
                    <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 text-xs sm:text-sm text-amber-200 space-y-1">
                      <div className="font-bold text-amber-400 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        <span>聖經福音歷史的預備（救贖神學視角）:</span>
                      </div>
                      <p className="font-serif italic leading-relaxed text-slate-200">
                        {topic.scripturalConnection}
                      </p>
                    </div>
                  )}

                  {/* Detailed Subsections */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {topic.details.map((sub, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2"
                      >
                        <h4 className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          {sub.subtitle}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {sub.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Key Figures Pill Bar */}
                  {topic.keyFigures && topic.keyFigures.length > 0 && (
                    <div className="pt-2 flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-slate-400">關鍵歷史人物:</span>
                      {topic.keyFigures.map((fig, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 text-slate-200 border border-slate-700"
                        >
                          {fig}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
