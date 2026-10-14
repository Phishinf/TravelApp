import React, { useState, useEffect } from 'react';
import { TabType } from '../../types';
import { 
  Calendar, 
  MapPin, 
  Compass, 
  Scroll, 
  Users, 
  Palette, 
  Music, 
  BookOpen, 
  ChevronDown, 
  ChevronRight, 
  Sparkles, 
  Bookmark, 
  BookMarked, 
  X,
  Church,
  Activity,
  Milestone,
  Landmark
} from 'lucide-react';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenScriptureDrawer: () => void;
  bookmarkedCount: number;
  completedEventsCount: number;
  totalEventsCount: number;
}

interface NavSubItem {
  id: TabType;
  labelZh: string;
  labelEn: string;
  icon: React.FC<{ className?: string }>;
}

interface NavGroup {
  groupId: string;
  groupLabelZh: string;
  groupLabelEn: string;
  groupIcon: React.FC<{ className?: string }>;
  items: NavSubItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isOpenMobile,
  onCloseMobile,
  onOpenScriptureDrawer,
  bookmarkedCount,
  completedEventsCount,
  totalEventsCount,
}) => {
  // Dropdown groups configuration as requested:
  // 1. "聖景足跡": 聖經景點, 保羅行程
  // 2. "教會歷史": 教父殉道, 聖像藝術, 教會建築
  // 3. "信徒活動": 培靈詩歌, 讀經日誌
  const navGroups: NavGroup[] = [
    {
      groupId: 'holy-sites',
      groupLabelZh: '聖景足跡',
      groupLabelEn: 'Sacred Footsteps',
      groupIcon: Milestone,
      items: [
        { id: 'sights', labelZh: '聖經景點', labelEn: 'Biblical Sights', icon: MapPin },
        { id: 'paul-journey', labelZh: '保羅行程', labelEn: "Paul's Journeys", icon: Compass },
      ],
    },
    {
      groupId: 'church-history',
      groupLabelZh: '教會歷史',
      groupLabelEn: 'Church History',
      groupIcon: Church,
      items: [
        { id: 'fathers-martyrs', labelZh: '教父殉道', labelEn: 'Fathers & Martyrs', icon: Users },
        { id: 'sacred-art', labelZh: '聖像藝術', labelEn: 'Sacred Art & Icons', icon: Palette },
        { id: 'church-architecture', labelZh: '教會建築', labelEn: 'Church Architecture', icon: Landmark },
      ],
    },
    {
      groupId: 'believer-activities',
      groupLabelZh: '信徒活動',
      groupLabelEn: 'Believer Activities',
      groupIcon: Activity,
      items: [
        { id: 'hymns', labelZh: '培靈詩歌', labelEn: 'Devotional Hymns', icon: Music },
        { id: 'journal', labelZh: '讀經日誌', labelEn: 'Study Notes & Journal', icon: BookOpen },
      ],
    },
  ];

  // Accordion state: keep open whichever group contains the activeTab
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    'holy-sites': true,
    'church-history': true,
    'believer-activities': true,
  });

  // Automatically ensure the group containing the active tab is expanded
  useEffect(() => {
    navGroups.forEach((group) => {
      if (group.items.some((item) => item.id === activeTab)) {
        setOpenGroups((prev) => ({ ...prev, [group.groupId]: true }));
      }
    });
  }, [activeTab]);

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleSelectTab = (tab: TabType) => {
    onTabChange(tab);
    onCloseMobile();
  };

  const progressPercent = totalEventsCount > 0 ? Math.round((completedEventsCount / totalEventsCount) * 100) : 0;

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-slate-900 border-r border-amber-900/40 text-slate-100 select-none">
      {/* Brand & Title Header */}
      <div>
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 flex items-center justify-center text-amber-100 shadow-md border border-amber-500/30 flex-shrink-0">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-sm sm:text-base text-amber-100 tracking-tight">
                  保羅行蹤
                </h1>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-950 text-amber-400 border border-amber-700/50">
                  希臘巡禮
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                Paul&apos;s Footsteps Guide
              </p>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menus List */}
        <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-230px)] scrollbar-thin">
          {/* 1. "行程" (amended from "巡禮行程") */}
          <div>
            <button
              onClick={() => handleSelectTab('itinerary')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                activeTab === 'itinerary'
                  ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-950 border border-amber-400/50'
                  : 'text-slate-300 hover:text-amber-200 hover:bg-slate-800/80 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className={`w-4 h-4 ${activeTab === 'itinerary' ? 'text-amber-200' : 'text-amber-400'}`} />
                <span className="text-sm">行程</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                activeTab === 'itinerary' ? 'bg-amber-700/80 text-amber-100' : 'bg-slate-800 text-slate-400'
              }`}>
                10-Day
              </span>
            </button>
          </div>

          {/* 2. Group 1: 聖景足跡 (Dropdown) -> 聖經景點, 保羅行程 */}
          {navGroups.slice(0, 1).map((group) => {
            const GroupIcon = group.groupIcon;
            const isOpen = openGroups[group.groupId];
            const hasActiveChild = group.items.some((i) => i.id === activeTab);

            return (
              <div key={group.groupId} className="pt-1">
                {/* Group Dropdown Trigger */}
                <button
                  onClick={() => toggleGroup(group.groupId)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    hasActiveChild
                      ? 'text-amber-300 bg-amber-950/40 border border-amber-800/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <GroupIcon className={`w-4 h-4 ${hasActiveChild ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="text-xs">{group.groupLabelZh}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 font-normal hidden sm:inline">
                      ({group.items.length})
                    </span>
                    {isOpen ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Sub-items */}
                {isOpen && (
                  <div className="pl-3 pr-1 py-1 space-y-1 border-l-2 border-slate-800 ml-4 mt-1">
                    {group.items.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = activeTab === subItem.id;
                      return (
                        <button
                          key={subItem.id}
                          onClick={() => handleSelectTab(subItem.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                            isSubActive
                              ? 'bg-amber-600 text-white font-semibold shadow-sm'
                              : 'text-slate-400 hover:text-amber-200 hover:bg-slate-800/60'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <SubIcon className={`w-3.5 h-3.5 ${isSubActive ? 'text-white' : 'text-amber-500/80'}`} />
                            <span>{subItem.labelZh}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* 3. "歷史百科" (Single item in sidebar) */}
          <div className="pt-1">
            <button
              onClick={() => handleSelectTab('history')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-950 border border-amber-400/50'
                  : 'text-slate-300 hover:text-amber-200 hover:bg-slate-800/80 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Scroll className={`w-4 h-4 ${activeTab === 'history' ? 'text-amber-200' : 'text-amber-400'}`} />
                <span className="text-sm">歷史百科</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                activeTab === 'history' ? 'bg-amber-700/80 text-amber-100' : 'bg-slate-800 text-slate-400'
              }`}>
                希臘羅馬
              </span>
            </button>
          </div>

          {/* 4. Group 2: 教會歷史 (Dropdown) -> 教父殉道, 聖像藝術, 教會建築 */}
          {navGroups.slice(1, 2).map((group) => {
            const GroupIcon = group.groupIcon;
            const isOpen = openGroups[group.groupId];
            const hasActiveChild = group.items.some((i) => i.id === activeTab);

            return (
              <div key={group.groupId} className="pt-1">
                {/* Group Dropdown Trigger */}
                <button
                  onClick={() => toggleGroup(group.groupId)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    hasActiveChild
                      ? 'text-amber-300 bg-amber-950/40 border border-amber-800/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <GroupIcon className={`w-4 h-4 ${hasActiveChild ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="text-xs">{group.groupLabelZh}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 font-normal hidden sm:inline">
                      ({group.items.length})
                    </span>
                    {isOpen ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Sub-items */}
                {isOpen && (
                  <div className="pl-3 pr-1 py-1 space-y-1 border-l-2 border-slate-800 ml-4 mt-1">
                    {group.items.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = activeTab === subItem.id;
                      return (
                        <button
                          key={subItem.id}
                          onClick={() => handleSelectTab(subItem.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                            isSubActive
                              ? 'bg-amber-600 text-white font-semibold shadow-sm'
                              : 'text-slate-400 hover:text-amber-200 hover:bg-slate-800/60'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <SubIcon className={`w-3.5 h-3.5 ${isSubActive ? 'text-white' : 'text-amber-500/80'}`} />
                            <span>{subItem.labelZh}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* 5. Group 3: 信徒活動 (Dropdown) -> 培靈詩歌, 讀經日誌 */}
          {navGroups.slice(2, 3).map((group) => {
            const GroupIcon = group.groupIcon;
            const isOpen = openGroups[group.groupId];
            const hasActiveChild = group.items.some((i) => i.id === activeTab);

            return (
              <div key={group.groupId} className="pt-1">
                {/* Group Dropdown Trigger */}
                <button
                  onClick={() => toggleGroup(group.groupId)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    hasActiveChild
                      ? 'text-amber-300 bg-amber-950/40 border border-amber-800/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <GroupIcon className={`w-4 h-4 ${hasActiveChild ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="text-xs">{group.groupLabelZh}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 font-normal hidden sm:inline">
                      ({group.items.length})
                    </span>
                    {isOpen ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Sub-items */}
                {isOpen && (
                  <div className="pl-3 pr-1 py-1 space-y-1 border-l-2 border-slate-800 ml-4 mt-1">
                    {group.items.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = activeTab === subItem.id;
                      return (
                        <button
                          key={subItem.id}
                          onClick={() => handleSelectTab(subItem.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                            isSubActive
                              ? 'bg-amber-600 text-white font-semibold shadow-sm'
                              : 'text-slate-400 hover:text-amber-200 hover:bg-slate-800/60'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <SubIcon className={`w-3.5 h-3.5 ${isSubActive ? 'text-white' : 'text-amber-500/80'}`} />
                            <span>{subItem.labelZh}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Controls */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/60 space-y-3">
        {/* Progress Tracker */}
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">行程打卡進度</span>
            <span className="font-semibold text-amber-400">
              {completedEventsCount} / {totalEventsCount}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onOpenScriptureDrawer();
              onCloseMobile();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/40 text-amber-200 text-xs font-medium transition cursor-pointer"
          >
            <BookMarked className="w-3.5 h-3.5 text-amber-400" />
            <span>經文速查</span>
          </button>

          <button
            onClick={() => handleSelectTab('sights')}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs transition cursor-pointer"
            title="查看已收藏景點"
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarkedCount > 0 ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
            <span>{bookmarkedCount}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block w-64 h-screen sticky top-0 flex-shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Off-canvas Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-950/80 backdrop-blur-sm flex">
          <div className="w-72 max-w-[85vw] h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
          <div className="flex-1" onClick={onCloseMobile} />
        </div>
      )}
    </>
  );
};
