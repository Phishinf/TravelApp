/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { SearchModal } from './components/common/SearchModal';
import { ScriptureDrawer } from './components/common/ScriptureDrawer';
import { ItineraryView } from './components/itinerary/ItineraryView';
import { SightsView } from './components/sights/SightsView';
import { PaulJourneyView } from './components/paul-journey/PaulJourneyView';
import { HistoryView } from './components/history/HistoryView';
import { FathersMartyrsView } from './components/fathers/FathersMartyrsView';
import { SacredArtView } from './components/sacred-art/SacredArtView';
import { HymnsView } from './components/hymns/HymnsView';
import { JournalView } from './components/journal/JournalView';
import { itineraryData } from './data/itineraryData';
import { storageService } from './services/storageService';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('itinerary');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isScriptureDrawerOpen, setIsScriptureDrawerOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Cross-component deep navigation payload
  const [targetSightId, setTargetSightId] = useState<string | undefined>(undefined);
  const [journalPrefill, setJournalPrefill] = useState<{
    verseRef?: string;
    verseText?: string;
    dayNumber?: number;
    title?: string;
  } | null>(null);

  // Bookmark & Progress stats
  const [bookmarksCount, setBookmarksCount] = useState<number>(() => {
    return storageService.getBookmarks().length;
  });

  const [completedEventsCount, setCompletedEventsCount] = useState<number>(() => {
    return storageService.getCompletedEvents().length;
  });

  const totalEventsCount = itineraryData.reduce((acc, day) => acc + day.events.length, 0);

  // Sync bookmark and event stats on focus or storage events
  useEffect(() => {
    const handleStorageChange = () => {
      setBookmarksCount(storageService.getBookmarks().length);
      setCompletedEventsCount(storageService.getCompletedEvents().length);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleNavigate = (tab: TabType, targetId?: string) => {
    if (tab === 'sights' && targetId) {
      setTargetSightId(targetId);
    }
    setActiveTab(tab);
  };

  const handleOpenJournalWithVerse = (ref: string, text: string) => {
    setJournalPrefill({
      verseRef: ref,
      verseText: text,
    });
    setActiveTab('journal');
  };

  const handleOpenJournalForDay = (dayNumber: number, title: string) => {
    setJournalPrefill({
      dayNumber,
      title,
    });
    setActiveTab('journal');
  };

  const handleOpenJournalForSight = (sightName: string, scripture: string) => {
    setJournalPrefill({
      title: `${sightName} 考察心得`,
      verseRef: scripture,
    });
    setActiveTab('journal');
  };

  const refreshStats = () => {
    setBookmarksCount(storageService.getBookmarks().length);
    setCompletedEventsCount(storageService.getCompletedEvents().length);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-row font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Left Sidebar with Dropdown Groups */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setTargetSightId(undefined);
          setActiveTab(tab);
        }}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onOpenScriptureDrawer={() => setIsScriptureDrawerOpen(true)}
        bookmarkedCount={bookmarksCount}
        completedEventsCount={completedEventsCount}
        totalEventsCount={totalEventsCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          onTabChange={(tab) => {
            setTargetSightId(undefined);
            setActiveTab(tab);
          }}
          onToggleSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenScriptureDrawer={() => setIsScriptureDrawerOpen(true)}
          bookmarkedCount={bookmarksCount}
          completedEventsCount={completedEventsCount}
          totalEventsCount={totalEventsCount}
        />

        {/* Main View Router */}
        <main className="flex-1 pb-16">
          {activeTab === 'itinerary' && (
            <ItineraryView
              onNavigateToSight={(sightId) => {
                setTargetSightId(sightId);
                setActiveTab('sights');
              }}
              onNavigateToHymn={() => {
                setActiveTab('hymns');
              }}
              onOpenJournalForDay={handleOpenJournalForDay}
              onEventToggled={refreshStats}
            />
          )}

          {activeTab === 'sights' && (
            <SightsView
              initialSightId={targetSightId}
              onOpenJournalForSight={handleOpenJournalForSight}
              onBookmarkChange={refreshStats}
            />
          )}

          {activeTab === 'paul-journey' && (
            <PaulJourneyView
              onOpenScriptureDrawer={() => setIsScriptureDrawerOpen(true)}
            />
          )}

          {activeTab === 'history' && <HistoryView />}

          {activeTab === 'fathers-martyrs' && <FathersMartyrsView />}

          {activeTab === 'sacred-art' && <SacredArtView />}

          {activeTab === 'hymns' && <HymnsView />}

          {activeTab === 'journal' && (
            <JournalView
              initialVerseRef={journalPrefill?.verseRef}
              initialVerseText={journalPrefill?.verseText}
              initialDayNumber={journalPrefill?.dayNumber}
              initialLocation={journalPrefill?.title}
            />
          )}
        </main>

        {/* Global Modals & Drawers */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onNavigate={handleNavigate}
        />

        <ScriptureDrawer
          isOpen={isScriptureDrawerOpen}
          onClose={() => setIsScriptureDrawerOpen(false)}
          onOpenJournalWithVerse={handleOpenJournalWithVerse}
        />

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <p className="text-slate-300 font-semibold flex items-center justify-center sm:justify-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                保羅行蹤・希臘聖經歷史文化研經巡禮指南 (Paul&apos;s Footsteps Pilgrimage)
              </p>
              <p className="text-slate-500 text-[11px]">
                依據朝聖手冊原書架構打造：十天行程表、使徒四次旅程、聖像畫藝術、希臘羅馬百科與培靈詩歌
              </p>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-500">
              <span>使徒行傳 16-18 章 · 馬其頓呼聲</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                以愛心與真理同行 <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
