import React from 'react';
import { TabType } from '../../types';
import { 
  Menu, 
  Search, 
  Bookmark, 
  BookMarked, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
  onOpenScriptureDrawer: () => void;
  bookmarkedCount: number;
  completedEventsCount: number;
  totalEventsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onToggleSidebar,
  onOpenSearch,
  onOpenScriptureDrawer,
  bookmarkedCount,
  completedEventsCount,
  totalEventsCount,
}) => {
  const progressPercent = totalEventsCount > 0 ? Math.round((completedEventsCount / totalEventsCount) * 100) : 0;

  // Active breadcrumb label
  const getBreadcrumb = () => {
    switch (activeTab) {
      case 'itinerary':
        return { group: null, current: '行程 (Itinerary)' };
      case 'sights':
        return { group: '聖景足跡', current: '聖經景點' };
      case 'paul-journey':
        return { group: '聖景足跡', current: '保羅行程' };
      case 'history':
        return { group: null, current: '歷史百科 (Greco-Roman History)' };
      case 'fathers-martyrs':
        return { group: '教會歷史', current: '教父殉道' };
      case 'sacred-art':
        return { group: '教會歷史', current: '聖像藝術' };
      case 'hymns':
        return { group: '信徒活動', current: '培靈詩歌' };
      case 'journal':
        return { group: '信徒活動', current: '研經日誌' };
      default:
        return { group: null, current: '行程' };
    }
  };

  const breadcrumb = getBreadcrumb();

  return (
    <header className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md border-b border-amber-900/30 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Left: Mobile Sidebar Toggle & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
            title="開啟導覽選單"
          >
            <Menu className="w-5 h-5 text-amber-400" />
          </button>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex w-8 h-8 rounded-lg bg-gradient-to-br from-amber-600 to-amber-900 items-center justify-center text-amber-200 border border-amber-500/30 flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>

            <div className="flex items-center gap-1.5 text-xs sm:text-sm">
              <span className="font-bold text-amber-200 hidden lg:inline">
                保羅行蹤・希臘聖經歷史研經指南
              </span>
              <span className="text-slate-600 hidden lg:inline">/</span>
              {breadcrumb.group && (
                <>
                  <span className="text-slate-400 font-medium">
                    {breadcrumb.group}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                </>
              )}
              <span className="text-amber-400 font-semibold">
                {breadcrumb.current}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Progress Tracker Pill */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
            <span className="text-amber-400 font-semibold">{completedEventsCount}/{totalEventsCount}</span>
            <span>打卡</span>
            <div className="w-14 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Scripture Quick Reader Button */}
          <button
            onClick={onOpenScriptureDrawer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-900/30 hover:bg-amber-900/50 border border-amber-700/40 text-amber-200 text-xs font-medium transition cursor-pointer"
            title="查看關鍵聖經經文"
          >
            <BookMarked className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">經文速查</span>
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-medium transition cursor-pointer"
            title="全局搜尋 (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">搜尋</span>
            <kbd className="hidden md:inline px-1 py-0.2 text-[10px] bg-slate-900 text-slate-400 rounded border border-slate-700">⌘K</kbd>
          </button>

          {/* Bookmarks Counter Button */}
          <button
            onClick={() => onTabChange('sights')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 text-xs transition cursor-pointer"
            title="查看已收藏景點"
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarkedCount > 0 ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
            <span>{bookmarkedCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
