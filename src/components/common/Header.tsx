import React, { useEffect, useRef, useState } from 'react';
import { TabType } from '../../types';
import { speechService, SpeechState, VoiceOption } from '../../services/speechService';
import { 
  Menu, 
  Search, 
  Bookmark, 
  BookMarked, 
  Sparkles,
  ChevronRight,
  Volume2,
  Pause,
  Square,
  SlidersHorizontal
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
      case 'church-architecture':
        return { group: '教會歷史', current: '教會建築' };
      case 'hymns':
        return { group: '信徒活動', current: '培靈詩歌' };
      case 'journal':
        return { group: '信徒活動', current: '讀經日誌' };
      default:
        return { group: null, current: '行程' };
    }
  };

  const breadcrumb = getBreadcrumb();

  // Read-aloud (text-to-speech) of the current page or selected text
  const [speechState, setSpeechState] = useState<SpeechState>(speechService.getState());

  useEffect(() => speechService.subscribe(setSpeechState), []);

  // Stop reading when switching to another page
  useEffect(() => {
    speechService.stop();
  }, [activeTab]);

  const handleSpeakToggle = () => {
    if (speechState === 'playing') {
      speechService.pause();
      return;
    }
    if (speechState === 'paused') {
      speechService.resume();
      return;
    }
    const selection = window.getSelection()?.toString().trim();
    const main = document.getElementById('main-content');
    const text = selection || (main ? speechService.extractText(main) : '');
    speechService.speak(text);
  };

  // Voice settings popover
  const [voiceMenuOpen, setVoiceMenuOpen] = useState(false);
  const [voiceOptions, setVoiceOptions] = useState<VoiceOption[]>(() => speechService.getVoiceOptions());
  const [voiceURI, setVoiceURI] = useState<string | null>(speechService.getSelectedVoiceURI());
  const [rate, setRate] = useState(speechService.getRate());
  const voiceMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => speechService.subscribeVoices(() => setVoiceOptions(speechService.getVoiceOptions())), []);

  useEffect(() => {
    if (!voiceMenuOpen) return;
    const close = (e: MouseEvent) => {
      if (!voiceMenuRef.current?.contains(e.target as Node)) setVoiceMenuOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [voiceMenuOpen]);

  const hasHighQualityVoice = voiceOptions.some((v) => v.quality !== 'standard');
  const isApple = /Mac|iPhone|iPad/.test(navigator.userAgent);

  const speakLabel =
    speechState === 'playing' ? '暫停朗讀' : speechState === 'paused' ? '繼續朗讀' : '朗讀本頁';

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

          {/* Read Aloud Button */}
          {speechService.isSupported() && (
            <div className="flex items-center gap-1">
              <button
                onMouseDown={(e) => e.preventDefault()} // keep any text selection intact
                onClick={handleSpeakToggle}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                  speechState === 'idle'
                    ? 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
                    : 'bg-amber-900/40 hover:bg-amber-900/60 border-amber-600/50 text-amber-200'
                }`}
                title={`${speakLabel}（可先選取文字，只朗讀選取部分）`}
                aria-label={speakLabel}
              >
                {speechState === 'playing' ? (
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Volume2 className={`w-3.5 h-3.5 ${speechState === 'idle' ? 'text-slate-400' : 'text-amber-400'}`} />
                )}
                <span className="hidden sm:inline">{speakLabel}</span>
              </button>
              <div className="relative" ref={voiceMenuRef}>
                <button
                  onClick={() => setVoiceMenuOpen((o) => !o)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                  title="朗讀聲音設定"
                  aria-label="朗讀聲音設定"
                  aria-expanded={voiceMenuOpen}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </button>
                {voiceMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-2rem)] p-4 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl space-y-3 text-xs z-30">
                    <label className="block space-y-1.5">
                      <span className="font-semibold text-slate-300">朗讀聲音</span>
                      <select
                        value={voiceURI ?? ''}
                        onChange={(e) => {
                          const uri = e.target.value || null;
                          setVoiceURI(uri);
                          speechService.setVoice(uri);
                        }}
                        className="w-full px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200"
                      >
                        <option value="">自動（最佳可用聲音）</option>
                        {voiceOptions.map((v) => (
                          <option key={v.uri} value={v.uri}>
                            {v.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <div className="space-y-1.5">
                      <span className="font-semibold text-slate-300">語速</span>
                      <div className="flex gap-1">
                        {[0.8, 0.9, 1, 1.1, 1.25].map((r) => (
                          <button
                            key={r}
                            onClick={() => {
                              setRate(r);
                              speechService.setRate(r);
                            }}
                            className={`flex-1 py-1 rounded-md border transition cursor-pointer ${
                              rate === r
                                ? 'bg-amber-500 border-amber-500 text-slate-950 font-bold'
                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                            }`}
                          >
                            {r}×
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => speechService.speak('平安！歡迎使用保羅行蹤朗讀功能。願主的話語伴隨你的朝聖旅程。')}
                      className="w-full py-1.5 rounded-lg bg-amber-900/40 hover:bg-amber-900/60 border border-amber-600/50 text-amber-200 font-medium transition cursor-pointer"
                    >
                      試聽
                    </button>

                    {!hasHighQualityVoice && (
                      <p className="text-[11px] leading-relaxed text-slate-400 border-t border-slate-800 pt-3">
                        {isApple ? (
                          <>
                            Siri 聲音無法在網頁中使用。如需更自然的聲音，請下載 Apple「增強／高品質」中文語音（如：美佳）：
                            <br />
                            iPhone／iPad：設定 › 輔助使用 › 朗讀內容 › 聲音 › 中文
                            <br />
                            Mac：系統設定 › 輔助使用 › 朗讀內容 › 系統聲音 › 管理聲音
                            <br />
                            下載後重新整理本頁即可選用。
                          </>
                        ) : (
                          <>未偵測到高品質中文語音。可於系統的語音／文字轉語音設定中下載中文語音，下載後重新整理本頁。</>
                        )}
                      </p>
                    )}
                  </div>
                )}
              </div>
              {speechState !== 'idle' && (
                <button
                  onClick={() => speechService.stop()}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 transition cursor-pointer"
                  title="停止朗讀"
                  aria-label="停止朗讀"
                >
                  <Square className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                </button>
              )}
            </div>
          )}

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
