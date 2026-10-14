import React, { useState } from 'react';
import { DayItinerary, ScheduleEvent, TabType } from '../../types';
import { itineraryData } from '../../data/itineraryData';
import { storageService } from '../../services/storageService';
import { WeatherForecastCard } from './WeatherForecastCard';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Compass, 
  BookOpen, 
  HeartHandshake, 
  Utensils, 
  Bus, 
  Sparkles, 
  ChevronRight, 
  Edit3,
  Moon,
  Sun,
  Sunset
} from 'lucide-react';

interface ItineraryViewProps {
  onNavigateToSight?: (sightId: string) => void;
  onNavigateToHymn?: (hymnId: number) => void;
  onOpenJournalForDay?: (dayNumber: number, title: string) => void;
  onEventToggled?: () => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  onNavigateToSight,
  onNavigateToHymn,
  onOpenJournalForDay,
  onEventToggled
}) => {
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(() => {
    return storageService.getActiveDay();
  });

  const [completedEvents, setCompletedEvents] = useState<string[]>(() => {
    return storageService.getCompletedEvents();
  });

  const currentDay = itineraryData.find((d) => d.dayNumber === selectedDayNumber) || itineraryData[0];

  const handleDaySelect = (dayNum: number) => {
    setSelectedDayNumber(dayNum);
    storageService.setActiveDay(dayNum);
  };

  const handleToggleEvent = (eventId: string) => {
    storageService.toggleCompletedEvent(eventId);
    const updated = storageService.getCompletedEvents();
    setCompletedEvents(updated);
    if (onEventToggled) onEventToggled();
  };

  const getCategoryBadge = (cat: ScheduleEvent['category']) => {
    switch (cat) {
      case 'worship':
        return {
          icon: Sparkles,
          label: '敬拜靈修',
          classes: 'bg-amber-950/60 text-amber-300 border-amber-700/50',
        };
      case 'sight':
        return {
          icon: MapPin,
          label: '歷史景點',
          classes: 'bg-blue-950/60 text-blue-300 border-blue-700/50',
        };
      case 'travel':
        return {
          icon: Bus,
          label: '車程轉移',
          classes: 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50',
        };
      case 'meal':
        return {
          icon: Utensils,
          label: '希臘餐膳',
          classes: 'bg-orange-950/60 text-orange-300 border-orange-700/50',
        };
      case 'reflection':
        return {
          icon: HeartHandshake,
          label: '晚禱交通',
          classes: 'bg-purple-950/60 text-purple-300 border-purple-700/50',
        };
      default:
        return {
          icon: Clock,
          label: '行程',
          classes: 'bg-slate-800 text-slate-300 border-slate-700',
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* 10-Day Horizontal Scroll Navigation */}
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-slate-100">十天行程日程選擇 (Day-by-Day Itinerary)</h2>
          </div>
          <span className="text-xs text-slate-400">
            點擊切換每日時間表與體驗主題
          </span>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {itineraryData.map((day) => {
            const isSelected = day.dayNumber === selectedDayNumber;
            const completedCount = day.events.filter((e) => completedEvents.includes(e.id)).length;
            const isAllCompleted = completedCount === day.events.length && day.events.length > 0;

            return (
              <button
                key={day.dayNumber}
                onClick={() => handleDaySelect(day.dayNumber)}
                className={`flex-shrink-0 w-44 p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-amber-900/60 to-slate-900 border-amber-500 shadow-md shadow-amber-950'
                    : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${isSelected ? 'text-amber-400' : 'text-slate-400'}`}>
                      {day.dateStr}
                    </span>
                    {isAllCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <span className="text-[10px] text-slate-500">
                        {completedCount}/{day.events.length}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-slate-200 line-clamp-1">
                    {day.titleZh.split('・')[0]}
                  </div>
                  <div className="text-[11px] text-amber-500/80 line-clamp-1 mt-0.5">
                    {day.regionZh}
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>🚗 {day.travelDistanceKm} km</span>
                  <span className="truncate max-w-[70px]">🏨 {day.overnightLocation}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Day Header Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-900/50 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950">
                {currentDay.dateStr}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 border border-slate-700 text-amber-300">
                {currentDay.regionZh} ({currentDay.region})
              </span>
              <span className="text-xs text-slate-400">
                車程估計: {currentDay.travelDistanceKm} 公里 · 住宿地點: {currentDay.overnightLocation}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              {currentDay.titleZh}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 italic font-serif">
              {currentDay.title}
            </p>
          </div>

          {/* Quick Day Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {onOpenJournalForDay && (
              <button
                onClick={() => onOpenJournalForDay(currentDay.dayNumber, currentDay.titleZh)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-900/40 hover:bg-amber-900/60 border border-amber-700/50 text-amber-200 text-xs font-medium transition cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>撰寫今日靈修日誌</span>
              </button>
            )}
          </div>
        </div>

        {/* Day Theme Verse */}
        <div className="p-4 rounded-xl bg-slate-950/80 border-l-4 border-amber-500 shadow-inner">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>今日主題經文: {currentDay.themeVerse.ref}</span>
          </div>
          <p className="text-sm text-slate-200 font-serif leading-relaxed italic">
            &quot;{currentDay.themeVerse.text}&quot;
          </p>
        </div>

        {/* Overview & Devotional Prompt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="md:col-span-2 space-y-2">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              今日行程重點概覽
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentDay.overviewZh}
            </p>
            {/* Key Spots Badges */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-xs text-slate-400 font-medium">核心參訪:</span>
              {currentDay.keySpots.map((spot, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-slate-800/80 text-[11px] text-amber-200 border border-slate-700"
                >
                  {spot}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              朝聖靈修省思默想
            </h4>
            <p className="text-xs text-amber-200/90 leading-relaxed font-serif">
              {currentDay.devotionalPrompt}
            </p>
          </div>
        </div>
      </div>

      {/* 3-Day Weather Forecast Component */}
      <WeatherForecastCard dayNumber={currentDay.dayNumber} />

      {/* Schedule Timeline Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              當日細化日程表 ({currentDay.events.length} 個行程節點)
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            點擊勾選框標記完成，將自動儲存記錄
          </span>
        </div>

        <div className="space-y-3">
          {currentDay.events.map((event, index) => {
            const isCompleted = completedEvents.includes(event.id);
            const badge = getCategoryBadge(event.category);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={event.id}
                className={`p-4 rounded-xl border transition-all ${
                  isCompleted
                    ? 'bg-slate-900/50 border-slate-800 opacity-75'
                    : 'bg-slate-900/90 border-slate-800 hover:border-amber-700/60 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => handleToggleEvent(event.id)}
                    className="mt-0.5 text-slate-400 hover:text-amber-400 transition cursor-pointer flex-shrink-0"
                    title={isCompleted ? '取消完成' : '標記完成'}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500 hover:text-amber-400" />
                    )}
                  </button>

                  {/* Main Event Body */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Time */}
                        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                          {event.time}
                        </span>

                        {/* Title */}
                        <h4 className={`text-sm sm:text-base font-bold ${
                          isCompleted ? 'line-through text-slate-400' : 'text-slate-100'
                        }`}>
                          {event.titleZh}
                        </h4>

                        {/* Category */}
                        <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border ${badge.classes}`}>
                          <BadgeIcon className="w-3 h-3" />
                          <span>{badge.label}</span>
                        </span>

                        {/* Highlight Tag */}
                        {event.highlight && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            ★ {event.highlight}
                          </span>
                        )}
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        <span>{event.locationZh}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {event.descriptionZh}
                    </p>

                    {/* Associated Scripture / Devotion if present */}
                    {event.scripture && (
                      <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-amber-200/90 font-serif flex items-start gap-2">
                        <span className="font-semibold text-amber-400 flex-shrink-0">
                          📖 {event.scripture.reference}:
                        </span>
                        <span className="italic leading-normal">
                          &quot;{event.scripture.text}&quot;
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
