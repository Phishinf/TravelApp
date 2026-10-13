import React, { useState } from 'react';
import { JournalEntry } from '../../types';
import { storageService } from '../../services/storageService';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Check, 
  Tag, 
  X,
  FileText
} from 'lucide-react';

interface JournalViewProps {
  initialVerseRef?: string;
  initialVerseText?: string;
  initialDayNumber?: number;
  initialLocation?: string;
}

const INSPIRATIONAL_PROMPTS = [
  {
    dayNumber: 2,
    location: '腓立比呂底亞洗禮溪畔',
    title: '呂底亞的敞開心門與我對福音的熱忱',
    prayer: '主啊，開導我的心，如同祢開導呂底亞，使我一生竭力接待聖徒、活出順服。',
  },
  {
    dayNumber: 3,
    location: '庇哩亞聖經講台',
    title: '效法庇哩亞人天天考查聖經的心志',
    prayer: '主啊，賜我飢渴慕義的心，不隨波逐流，單單以聖經真理為我腳前的燈、路上的光。',
  },
  {
    dayNumber: 6,
    location: '雅典亞略巴古 (Mars Hill)',
    title: '在世俗哲學與偶像滿布的世界勇敢見證獨一真神',
    prayer: '天父，賜我保羅跨文化的宣教智慧，向後現代世界闡明復活的耶穌基督。',
  },
  {
    dayNumber: 7,
    location: '古哥林多審判台 (Bema)',
    title: '站在主的審判台前——奔跑不求人的掌聲',
    prayer: '願我一生事奉能經得起火的試驗，持守真道，向著標竿直跑。',
  },
];

export const JournalView: React.FC<JournalViewProps> = ({
  initialVerseRef,
  initialVerseText,
  initialDayNumber,
  initialLocation,
}) => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    return storageService.getJournalEntries();
  });

  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(Boolean(initialVerseRef || initialDayNumber));

  // Form State
  const [dayNumber, setDayNumber] = useState<number>(initialDayNumber || 1);
  const [location, setLocation] = useState<string>(initialLocation || '希臘巡禮現場');
  const [title, setTitle] = useState<string>(initialVerseRef ? `關於 ${initialVerseRef} 的默想` : '');
  const [content, setContent] = useState<string>(initialVerseText ? `【研讀經文】${initialVerseText}\n\n【今日領受】` : '');
  const [prayer, setPrayer] = useState<string>('');
  const [verseRef, setVerseRef] = useState<string>(initialVerseRef || '');
  const [savedAlert, setSavedAlert] = useState<boolean>(false);

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    const newEntry: JournalEntry = {
      id: `journal-${Date.now()}`,
      date: new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' }),
      dayNumber,
      location,
      title: title.trim() || '朝聖靈修隨想',
      content: content.trim(),
      prayer: prayer.trim(),
      verseRef: verseRef.trim(),
      tags: [`Day ${dayNumber}`, location],
      createdAt: Date.now(),
    };

    storageService.saveJournalEntry(newEntry);
    setEntries(storageService.getJournalEntries());

    // Reset Form
    setTitle('');
    setContent('');
    setPrayer('');
    setVerseRef('');
    setIsEditorOpen(false);

    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('確定要刪除這篇研經心得嗎？')) {
      storageService.deleteJournalEntry(id);
      setEntries(storageService.getJournalEntries());
    }
  };

  const handleExport = () => {
    const dataStr = storageService.exportAllData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Pauls_Footsteps_Study_Journal_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const handleApplyPrompt = (prompt: typeof INSPIRATIONAL_PROMPTS[0]) => {
    setDayNumber(prompt.dayNumber);
    setLocation(prompt.location);
    setTitle(prompt.title);
    setPrayer(prompt.prayer);
    setIsEditorOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              巡禮靈修研經日誌 (Study Notes &amp; Pilgrimage Journal)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            記錄每日行蹤亮光、禱告回應與經文心得，永久儲存於瀏覽器，並支援匯出個人屬靈筆記
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition cursor-pointer"
            title="匯出為備份文件"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>匯出備份</span>
          </button>

          <button
            onClick={() => setIsEditorOpen(!isEditorOpen)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-md transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>新增靈修筆記</span>
          </button>
        </div>
      </div>

      {savedAlert && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-200 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>靈修筆記已成功保存！</span>
        </div>
      )}

      {/* Editor Drawer / Box */}
      {isEditorOpen && (
        <form
          onSubmit={handleSaveEntry}
          className="bg-slate-900 border border-amber-900/60 rounded-2xl p-6 shadow-xl space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              撰寫今日靈修心得
            </h3>
            <button
              type="button"
              onClick={() => setIsEditorOpen(false)}
              className="text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                行程天數:
              </label>
              <select
                value={dayNumber}
                onChange={(e) => setDayNumber(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    Day {num}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                當前考察地點:
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="例如：腓立比監獄、雅典亞略巴古"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                引述聖經經文出處 (選填):
              </label>
              <input
                type="text"
                value={verseRef}
                onChange={(e) => setVerseRef(e.target.value)}
                placeholder="例如：使徒行傳 16:25-34"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              筆記標題:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="今日心得主旨..."
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              靈修領受與聖經心得:
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="記錄神透過現場環境、使徒宣教歷史向你說的話..."
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              向神的回應禱告 (Prayer Petition):
            </label>
            <textarea
              rows={2}
              value={prayer}
              onChange={(e) => setPrayer(e.target.value)}
              placeholder="親愛的主耶穌..."
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditorOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition shadow-md cursor-pointer"
            >
              保存至日誌
            </button>
          </div>
        </form>
      )}

      {/* Recommended Prompts Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          巡禮靈修範本推薦（點擊直接帶入撰寫）
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {INSPIRATIONAL_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPrompt(p)}
              className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-700/60 text-left transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold text-amber-400">
                  Day {p.dayNumber} · {p.location}
                </span>
                <h4 className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition mt-1">
                  {p.title}
                </h4>
              </div>
              <span className="text-[10px] text-amber-500 font-medium mt-3">
                採用此靈修範本 →
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            我的靈修記錄清單 ({entries.length} 篇)
          </h3>
        </div>

        {entries.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400 space-y-2">
            <FileText className="w-10 h-10 mx-auto text-slate-600" />
            <p className="text-sm">尚無日誌記錄。點擊上方「新增靈修筆記」開始記錄你的希臘朝聖見證！</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-md flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {entry.dayNumber && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800/60">
                          Day {entry.dayNumber}
                        </span>
                      )}
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        {entry.location}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition cursor-pointer"
                      title="刪除筆記"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="text-base font-bold text-slate-100">
                    {entry.title}
                  </h4>

                  {entry.verseRef && (
                    <div className="text-xs text-amber-400 font-serif">
                      📖 {entry.verseRef}
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                    {entry.content}
                  </p>

                  {entry.prayer && (
                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200/90 font-serif italic">
                      <span className="font-bold text-amber-400 not-italic block mb-0.5">✝ 回應禱告:</span>
                      &quot;{entry.prayer}&quot;
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>記錄時間: {entry.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
