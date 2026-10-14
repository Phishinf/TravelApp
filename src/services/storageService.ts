import { JournalEntry } from '../types';

const STORAGE_KEYS = {
  BOOKMARKS: 'pauls_footsteps_bookmarks',
  COMPLETED_EVENTS: 'pauls_footsteps_completed_events',
  JOURNAL_ENTRIES: 'pauls_footsteps_journal_entries',
  ACTIVE_DAY: 'pauls_footsteps_active_day'
};

export const storageService = {
  // Bookmarks
  getBookmarks(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleBookmark(id: string): boolean {
    const list = this.getBookmarks();
    const index = list.indexOf(id);
    let isBookmarked = false;
    if (index >= 0) {
      list.splice(index, 1);
      isBookmarked = false;
    } else {
      list.push(id);
      isBookmarked = true;
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
    return isBookmarked;
  },

  isBookmarked(id: string): boolean {
    return this.getBookmarks().includes(id);
  },

  // Schedule Checkmarks
  getCompletedEvents(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_EVENTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleCompletedEvent(eventId: string): boolean {
    const list = this.getCompletedEvents();
    const idx = list.indexOf(eventId);
    let state = false;
    if (idx >= 0) {
      list.splice(idx, 1);
      state = false;
    } else {
      list.push(eventId);
      state = true;
    }
    localStorage.setItem(STORAGE_KEYS.COMPLETED_EVENTS, JSON.stringify(list));
    return state;
  },

  // Journal Entries
  getJournalEntries(): JournalEntry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    // Initial sample entry from Neapolis landing
    return [
      {
        id: 'sample-entry-1',
        date: '2026-10-13',
        dayNumber: 8,
        location: 'Kavala / Neapolis (尼亞波利舊港)',
        title: '佇立在歐洲宣教第一站海灣的默想',
        content: '今天在迦華拿聖尼古拉教堂看著巨大的馬賽克壁畫，心中深深被感動。保羅在特羅亞順服聖靈的引導，放下原先的宣教路線，毅然越洋來到這座港口。如果沒有當初的順服，福音何時才能傳到歐洲與更遠的地極？求主也賜我一顆敏銳順服的心。',
        prayer: '親愛的主，求你賜我敞開的耳與清潔的心，讓我在人生的每一次十字路口，都懂得傾聽聖靈微小的聲音，甘心樂意回應你的呼召。阿們！',
        verseRef: '使徒行傳 16:9-10',
        tags: ['馬其頓呼聲', '順服', '迦華拿'],
        createdAt: Date.now() - 3600000 * 24
      }
    ];
  },

  saveJournalEntry(entry: Omit<JournalEntry, 'id' | 'createdAt'> & { id?: string }): JournalEntry {
    const entries = this.getJournalEntries();
    let saved: JournalEntry;
    if (entry.id) {
      const idx = entries.findIndex(e => e.id === entry.id);
      if (idx >= 0) {
        entries[idx] = { ...entries[idx], ...entry };
        saved = entries[idx];
      } else {
        saved = {
          ...entry,
          id: entry.id,
          createdAt: Date.now()
        };
        entries.unshift(saved);
      }
    } else {
      saved = {
        ...entry,
        id: `journal-${Date.now()}`,
        createdAt: Date.now()
      };
      entries.unshift(saved);
    }
    localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));
    return saved;
  },

  deleteJournalEntry(id: string): void {
    const entries = this.getJournalEntries().filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));
  },

  // Active day persistence
  getActiveDay(): number {
    try {
      const v = localStorage.getItem(STORAGE_KEYS.ACTIVE_DAY);
      return v ? parseInt(v, 10) : 1;
    } catch {
      return 1;
    }
  },

  setActiveDay(day: number): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_DAY, day.toString());
  },

  exportAllData(): string {
    const data = {
      bookmarks: this.getBookmarks(),
      completedEvents: this.getCompletedEvents(),
      journalEntries: this.getJournalEntries(),
      activeDay: this.getActiveDay(),
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  },

  importData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.bookmarks) localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(parsed.bookmarks));
      if (parsed.completedEvents) localStorage.setItem(STORAGE_KEYS.COMPLETED_EVENTS, JSON.stringify(parsed.completedEvents));
      if (parsed.journalEntries) localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(parsed.journalEntries));
      if (parsed.activeDay) localStorage.setItem(STORAGE_KEYS.ACTIVE_DAY, parsed.activeDay.toString());
      return true;
    } catch {
      return false;
    }
  }
};
