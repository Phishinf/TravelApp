import React, { useState, useMemo, useEffect } from 'react';
import { TabType } from '../../types';
import { sightsData } from '../../data/sightsData';
import { itineraryData } from '../../data/itineraryData';
import { paulJourneyData } from '../../data/paulJourneyData';
import { historyEncyclopediaData } from '../../data/historyEncyclopediaData';
import { fathersMartyrsData } from '../../data/fathersMartyrsData';
import { sacredArtData } from '../../data/sacredArtData';
import { hymnsData } from '../../data/hymnsData';
import { Search, X, MapPin, Calendar, Compass, Scroll, Users, Palette, Music, ArrowRight } from 'lucide-react';

interface SearchResult {
  id: string;
  tab: TabType;
  title: string;
  subtitle: string;
  snippet: string;
  categoryBadge: string;
  icon: React.FC<{ className?: string }>;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: TabType, targetId?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    const list: SearchResult[] = [];

    // 1. Sights
    sightsData.forEach((s) => {
      const match =
        s.nameZh.toLowerCase().includes(trimmed) ||
        s.nameEn.toLowerCase().includes(trimmed) ||
        (s.ancientName && s.ancientName.toLowerCase().includes(trimmed)) ||
        s.summary.toLowerCase().includes(trimmed) ||
        s.scriptureRef.toLowerCase().includes(trimmed) ||
        s.historicalContext.toLowerCase().includes(trimmed);

      if (match) {
        list.push({
          id: s.id,
          tab: 'sights',
          title: `${s.nameZh} (${s.nameEn})`,
          subtitle: `聖經記載: ${s.scriptureRef} · ${s.region}`,
          snippet: s.summary,
          categoryBadge: '景點景點',
          icon: MapPin,
        });
      }
    });

    // 2. Itinerary
    itineraryData.forEach((day) => {
      const matchDay =
        day.titleZh.toLowerCase().includes(trimmed) ||
        day.title.toLowerCase().includes(trimmed) ||
        day.overviewZh.toLowerCase().includes(trimmed) ||
        day.themeVerse.ref.toLowerCase().includes(trimmed);

      if (matchDay) {
        list.push({
          id: `day-${day.dayNumber}`,
          tab: 'itinerary',
          title: `${day.dateStr}: ${day.titleZh}`,
          subtitle: `${day.regionZh} · 主題經文: ${day.themeVerse.ref}`,
          snippet: day.overviewZh,
          categoryBadge: '行程',
          icon: Calendar,
        });
      }

      // Check events inside day
      day.events.forEach((ev) => {
        if (
          ev.titleZh.toLowerCase().includes(trimmed) ||
          ev.descriptionZh.toLowerCase().includes(trimmed) ||
          (ev.scripture && ev.scripture.reference.toLowerCase().includes(trimmed))
        ) {
          list.push({
            id: `day-${day.dayNumber}`,
            tab: 'itinerary',
            title: `${day.dateStr} [${ev.time}] ${ev.titleZh}`,
            subtitle: `${ev.locationZh} · ${ev.category}`,
            snippet: ev.descriptionZh,
            categoryBadge: '行程事項',
            icon: Calendar,
          });
        }
      });
    });

    // 3. Paul Journey
    paulJourneyData.forEach((j) => {
      if (
        j.journeyNameZh.toLowerCase().includes(trimmed) ||
        j.summaryZh.toLowerCase().includes(trimmed) ||
        j.historicalImpact.toLowerCase().includes(trimmed) ||
        j.route.some((r) => r.toLowerCase().includes(trimmed)) ||
        j.companions.some((c) => c.toLowerCase().includes(trimmed))
      ) {
        list.push({
          id: j.id,
          tab: 'paul-journey',
          title: `${j.journeyNameZh} (${j.years})`,
          subtitle: `同行同工: ${j.companions.join('、')} · 書信: ${j.associatedEpistles.join('、')}`,
          snippet: j.summaryZh,
          categoryBadge: '保羅行程',
          icon: Compass,
        });
      }
    });

    // 4. History
    historyEncyclopediaData.forEach((h) => {
      if (
        h.titleZh.toLowerCase().includes(trimmed) ||
        h.titleEn.toLowerCase().includes(trimmed) ||
        h.leadSummary.toLowerCase().includes(trimmed) ||
        (h.scripturalConnection && h.scripturalConnection.toLowerCase().includes(trimmed)) ||
        h.details.some((d) => d.content.toLowerCase().includes(trimmed) || d.subtitle.toLowerCase().includes(trimmed))
      ) {
        list.push({
          id: h.id,
          tab: 'history',
          title: h.titleZh,
          subtitle: `${h.period} · ${h.titleEn}`,
          snippet: h.leadSummary,
          categoryBadge: '歷史百科',
          icon: Scroll,
        });
      }
    });

    // 5. Church Fathers & Martyrs
    fathersMartyrsData.forEach((f) => {
      if (
        f.nameZh.toLowerCase().includes(trimmed) ||
        f.nameEn.toLowerCase().includes(trimmed) ||
        f.role.toLowerCase().includes(trimmed) ||
        f.historicalSignificance.toLowerCase().includes(trimmed) ||
        f.quotesOrEvents.some((q) => q.toLowerCase().includes(trimmed))
      ) {
        list.push({
          id: f.id,
          tab: 'fathers-martyrs',
          title: `${f.nameZh} (${f.nameEn})`,
          subtitle: `${f.years} · ${f.role}`,
          snippet: f.historicalSignificance,
          categoryBadge: '教父殉道',
          icon: Users,
        });
      }
    });

    // 6. Sacred Art
    sacredArtData.forEach((a) => {
      if (
        a.titleZh.toLowerCase().includes(trimmed) ||
        a.leadSummary.toLowerCase().includes(trimmed) ||
        a.keyPoints.some((kp) => kp.heading.toLowerCase().includes(trimmed) || kp.body.toLowerCase().includes(trimmed))
      ) {
        list.push({
          id: a.id,
          tab: 'sacred-art',
          title: a.titleZh,
          subtitle: `${a.historicalPeriod} · ${a.titleEn}`,
          snippet: a.leadSummary,
          categoryBadge: '聖像藝術',
          icon: Palette,
        });
      }
    });

    // 7. Hymns
    hymnsData.forEach((hymn) => {
      if (
        hymn.titleZh.toLowerCase().includes(trimmed) ||
        (hymn.titleEn && hymn.titleEn.toLowerCase().includes(trimmed)) ||
        hymn.scriptureFoundation.toLowerCase().includes(trimmed) ||
        hymn.theme.toLowerCase().includes(trimmed) ||
        hymn.lyrics.some((line) => line.toLowerCase().includes(trimmed))
      ) {
        list.push({
          id: `hymn-${hymn.id}`,
          tab: 'hymns',
          title: `詩歌第 ${hymn.id} 首: ${hymn.titleZh} (${hymn.titleEn || ''})`,
          subtitle: `經文依據: ${hymn.scriptureFoundation} · 調式: ${hymn.musicKey || 'G大調'}`,
          snippet: hymn.lyrics.slice(0, 2).join(' / '),
          categoryBadge: '培靈詩歌',
          icon: Music,
        });
      }
    });

    return list.slice(0, 15);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      <div className="bg-slate-900 border border-amber-900/40 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-900/90">
          <Search className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜尋經文、景點（如：腓立比、亞略巴古）、皇帝（尼祿）、教父、詩歌..."
            className="w-full bg-transparent border-none text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-200 p-1 text-xs"
            >
              清空
            </button>
          )}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs text-slate-400">
          <span className="text-amber-500 font-medium flex-shrink-0">熱門關鍵字:</span>
          {['腓立比', '帖撒羅尼迦', '雅典', '哥林多', '邁泰奧拉', '馬其頓呼聲', '坡旅甲', '如鹿切慕溪水', '羅馬皇帝', '聖像畫'].map(
            (tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2 py-0.5 rounded-full bg-slate-800 hover:bg-amber-900/40 hover:text-amber-300 border border-slate-700/60 transition flex-shrink-0 cursor-pointer"
              >
                {tag}
              </button>
            )
          )}
        </div>

        {/* Results Body */}
        <div className="p-2 overflow-y-auto flex-1 divide-y divide-slate-800/50">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              <Scroll className="w-10 h-10 mx-auto mb-2 text-slate-600 opacity-50" />
              輸入關鍵字以即時檢索全書行程、聖經景點、希臘歷史、使徒旅程與詩歌
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              找不到與 &quot;<span className="text-amber-400">{query}</span>&quot; 相符的資料。請嘗試使用其他希臘城市名、聖經人名或主題。
            </div>
          ) : (
            results.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${item.tab}-${item.id}-${idx}`}
                  onClick={() => {
                    onNavigate(item.tab, item.id);
                    onClose();
                  }}
                  className="p-3 hover:bg-slate-800/80 rounded-xl transition cursor-pointer flex items-start justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-800/40 text-amber-400 flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-slate-100 group-hover:text-amber-300 transition">
                          {item.title}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 border border-slate-700 text-amber-400 font-medium">
                          {item.categoryBadge}
                        </span>
                      </div>
                      <p className="text-xs text-amber-500/90 mt-0.5 truncate">{item.subtitle}</p>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {item.snippet}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition flex-shrink-0 self-center" />
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
          <span>共 {results.length} 筆搜尋結果</span>
          <span>按 ESC 關閉</span>
        </div>
      </div>
    </div>
  );
};
