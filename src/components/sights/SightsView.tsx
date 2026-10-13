import React, { useState, useMemo } from 'react';
import { Sight } from '../../types';
import { sightsData } from '../../data/sightsData';
import { storageService } from '../../services/storageService';
import { 
  MapPin, 
  Search, 
  Bookmark, 
  BookOpen, 
  Compass, 
  Calendar, 
  ExternalLink, 
  X, 
  ChevronRight, 
  Info,
  CheckCircle,
  Sparkles
} from 'lucide-react';

interface SightsViewProps {
  initialSightId?: string;
  onOpenJournalForSight?: (sightName: string, scripture: string) => void;
  onBookmarkChange?: () => void;
}

export const SightsView: React.FC<SightsViewProps> = ({
  initialSightId,
  onOpenJournalForSight,
  onBookmarkChange,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSightModal, setActiveSightModal] = useState<Sight | null>(() => {
    if (initialSightId) {
      return sightsData.find((s) => s.id === initialSightId) || null;
    }
    return null;
  });
  const [bookmarkedList, setBookmarkedList] = useState<string[]>(() => {
    return storageService.getBookmarks();
  });

  const regions = useMemo(() => {
    const list = Array.from(new Set(sightsData.map((s) => s.region)));
    return ['all', ...list];
  }, []);

  const filteredSights = useMemo(() => {
    return sightsData.filter((s) => {
      const matchRegion = selectedRegion === 'all' || s.region === selectedRegion;
      const matchQuery =
        !searchQuery.trim() ||
        s.nameZh.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.ancientName && s.ancientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        s.scriptureRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchRegion && matchQuery;
    });
  }, [selectedRegion, searchQuery]);

  const handleToggleBookmark = (sightId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    storageService.toggleBookmark(sightId);
    setBookmarkedList(storageService.getBookmarks());
    if (onBookmarkChange) onBookmarkChange();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Title & Introduction */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              聖經歷史巡禮景點庫 (Biblical &amp; Historical Sights)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            依照希臘地理大區劃分，詳列保羅傳道腳蹤要塞、世界文化遺產與歷代古蹟考證
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋景點名稱、經文、古名..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-500 transition"
          />
        </div>
      </div>

      {/* Region Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs text-slate-400 font-medium flex-shrink-0">大區篩選:</span>
        {regions.map((reg) => {
          const isSelected = selectedRegion === reg;
          return (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap flex-shrink-0 ${
                isSelected
                  ? 'bg-amber-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-amber-200 border border-slate-800'
              }`}
            >
              {reg === 'all' ? '全部景點 (All Sights)' : reg}
            </button>
          );
        })}
      </div>

      {/* Sights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSights.map((sight) => {
          const isBookmarked = bookmarkedList.includes(sight.id);

          return (
            <div
              key={sight.id}
              onClick={() => setActiveSightModal(sight)}
              className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-amber-700/60 overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer group"
            >
              {/* Header Image Area / Decorative Ancient Header */}
              <div className="relative h-44 bg-slate-950 overflow-hidden">
                <img
                  src={sight.imageUrl}
                  alt={sight.nameZh}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                
                {/* Region Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30">
                    {sight.region}
                  </span>
                </div>

                {/* Bookmark Toggle */}
                <button
                  onClick={(e) => handleToggleBookmark(sight.id, e)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-amber-400 transition cursor-pointer"
                  title={isBookmarked ? '取消收藏' : '收藏景點'}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isBookmarked ? 'text-amber-400 fill-amber-400' : ''}`}
                  />
                </button>

                {/* Bottom title inside cover */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-[11px] text-amber-400 font-serif tracking-wider">
                    {sight.ancientName || sight.nameEn}
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight drop-shadow-md">
                    {sight.nameZh}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Scripture Pill */}
                  <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-900/50 text-xs text-amber-200">
                    <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>聖經記載: {sight.scriptureRef}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-serif italic mt-1 line-clamp-2">
                      &quot;{sight.scriptureText}&quot;
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {sight.summary}
                  </p>

                  {/* Must-see highlights */}
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      必訪亮點:
                    </span>
                    <ul className="space-y-1">
                      {sight.mustSeeSpots.slice(0, 2).map((spot, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                          <span className="text-amber-500 font-bold">•</span>
                          <span className="font-medium text-slate-200">{spot.name}:</span>
                          <span className="text-slate-400 line-clamp-1">{spot.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex gap-1 flex-wrap">
                    {sight.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-amber-400 font-medium group-hover:translate-x-1 transition flex items-center gap-0.5">
                    詳細導覽 <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SIGHT DETAIL MODAL */}
      {activeSightModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-amber-900/50 rounded-2xl w-full max-w-3xl max-h-[90vh] shadow-2xl overflow-y-auto flex flex-col">
            {/* Modal Cover */}
            <div className="relative h-60 sm:h-72 bg-slate-950 flex-shrink-0">
              <img
                src={activeSightModal.imageUrl}
                alt={activeSightModal.nameZh}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
              
              <button
                onClick={() => setActiveSightModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-2.5 py-1 rounded text-xs font-semibold bg-amber-500 text-slate-950">
                  {activeSightModal.region}
                </span>
                <div className="text-xs text-amber-300 font-serif mt-2">
                  {activeSightModal.ancientName} · {activeSightModal.nameEn}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-0.5">
                  {activeSightModal.nameZh}
                </h2>
              </div>
            </div>

            {(activeSightModal.imageCaption || activeSightModal.imageCredit) && (
              <div className="px-6 pt-2 text-[11px] text-slate-500 leading-snug">
                {activeSightModal.imageCaption}
                {activeSightModal.imageCredit && (
                  <span className="block text-slate-600">📷 {activeSightModal.imageCredit}</span>
                )}
              </div>
            )}

            {/* Modal Body */}
            <div className="p-6 space-y-6 flex-1 text-slate-200">
              {/* Scripture Highlight Box */}
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/50 space-y-1">
                <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>聖經經文記錄: {activeSightModal.scriptureRef}</span>
                </div>
                <p className="text-sm font-serif italic text-amber-100 leading-relaxed">
                  &quot;{activeSightModal.scriptureText}&quot;
                </p>
              </div>

              {/* Historical Context Narrative */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  景點深度歷史與考古背景
                </h3>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-2">
                  {activeSightModal.historicalContext}
                </div>
              </div>

              {/* Timeline of periods */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  歷史紀元發展編年 (Historical Timeline)
                </h3>
                <div className="space-y-2.5 border-l-2 border-amber-700/60 pl-4 ml-1">
                  {activeSightModal.timeline.map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-500 border border-slate-900" />
                      <div className="text-xs font-bold text-amber-300">{item.period}: {item.title}</div>
                      <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Must-See Spots */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  巡禮必訪重點與屬靈意義 (Key Visiting Spots)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeSightModal.mustSeeSpots.map((spot, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1"
                    >
                      <h4 className="text-xs font-bold text-slate-100">{spot.name}</h4>
                      <p className="text-xs text-slate-400">{spot.description}</p>
                      {spot.biblicalSignificance && (
                        <p className="text-[11px] text-amber-400/90 font-serif pt-1 border-t border-slate-800/80">
                          ✝ 屬靈啟示: {spot.biblicalSignificance}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer actions */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    const id = activeSightModal.id;
                    storageService.toggleBookmark(id);
                    setBookmarkedList(storageService.getBookmarks());
                    if (onBookmarkChange) onBookmarkChange();
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition cursor-pointer"
                >
                  <Bookmark
                    className={`w-4 h-4 ${bookmarkedList.includes(activeSightModal.id) ? 'text-amber-400 fill-amber-400' : ''}`}
                  />
                  <span>
                    {bookmarkedList.includes(activeSightModal.id) ? '已收藏在景點清單' : '加入我的收藏'}
                  </span>
                </button>

                {onOpenJournalForSight && (
                  <button
                    onClick={() => {
                      onOpenJournalForSight(
                        activeSightModal.nameZh,
                        activeSightModal.scriptureRef
                      );
                      setActiveSightModal(null);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition cursor-pointer shadow-md"
                  >
                    <span>撰寫景點隨行隨想</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
