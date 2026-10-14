import React, { useEffect, useState } from 'react';
import { HistoricalTopic, TopicGalleryItem } from '../../types';
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
  Compass,
  UtensilsCrossed,
  ChefHat,
  Users,
  X
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
    { id: 'cuisine', label: '美食與特產 (Cuisine & Specialties)', icon: UtensilsCrossed },
  ];

  const filteredTopics = historyEncyclopediaData.filter((topic) => {
    return selectedCategory === 'all' || topic.category === selectedCategory;
  });

  const [recipeItem, setRecipeItem] = useState<TopicGalleryItem | null>(null);

  useEffect(() => {
    if (!recipeItem) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setRecipeItem(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [recipeItem]);

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
          涵蓋古希臘文明與藝術、城邦戰爭、亞歷山大希臘化擴張、馬加比起義與羅馬帝國歷任皇帝統治背景，理解福音降臨的歷史土壤；另附希臘美食與特產
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

                  {/* Photo Gallery (dishes open a recipe) */}
                  {topic.gallery && topic.gallery.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {topic.gallery.map((item) => (
                        <figure
                          key={item.imageUrl}
                          className="rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden flex flex-col"
                        >
                          <img
                            src={item.imageUrl}
                            alt={`${item.titleZh} (${item.titleEn})`}
                            loading="lazy"
                            className="w-full aspect-[4/3] object-cover bg-slate-950"
                          />
                          <figcaption className="p-4 space-y-1.5 flex-1 flex flex-col">
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <h4 className="text-sm font-bold text-amber-300">{item.titleZh}</h4>
                              <span className="text-[11px] text-slate-400 font-serif">{item.titleEn}</span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed flex-1">{item.caption}</p>
                            {item.recipe && (
                              <button
                                onClick={() => setRecipeItem(item)}
                                className="mt-2 self-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition cursor-pointer"
                              >
                                <ChefHat className="w-3.5 h-3.5" />
                                查看食譜
                              </button>
                            )}
                            <a
                              href={item.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="pt-1 text-[10px] text-slate-500 hover:text-amber-300 underline"
                            >
                              圖片：{item.credit}
                            </a>
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}

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

      {/* Recipe Modal */}
      {recipeItem?.recipe && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setRecipeItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${recipeItem.titleZh} 食譜`}
        >
          <div
            className="bg-slate-900 border border-amber-900/50 rounded-2xl w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-y-auto text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={recipeItem.imageUrl}
                alt={recipeItem.titleZh}
                className="w-full h-48 sm:h-56 object-cover"
              />
              <button
                onClick={() => setRecipeItem(null)}
                className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/80 text-slate-200 hover:bg-slate-800 cursor-pointer"
                aria-label="關閉"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-amber-400" />
                  {recipeItem.titleZh} 食譜
                  <span className="text-sm font-normal text-slate-400 font-serif">{recipeItem.titleEn}</span>
                </h3>
                <div className="flex items-center gap-4 text-xs text-amber-300 mt-2">
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{recipeItem.recipe.servings}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{recipeItem.recipe.time}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">材料</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs sm:text-sm text-slate-300">
                  {recipeItem.recipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">做法</h4>
                <ol className="space-y-2.5">
                  {recipeItem.recipe.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <span className="w-6 h-6 rounded-full bg-amber-950 border border-amber-700 text-amber-300 text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {recipeItem.recipe.tip && (
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/60 text-xs sm:text-sm text-amber-200">
                  <span className="font-bold">小貼士：</span>{recipeItem.recipe.tip}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
