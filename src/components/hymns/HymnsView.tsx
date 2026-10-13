import React, { useState, useEffect } from 'react';
import { Hymn } from '../../types';
import { hymnsData } from '../../data/hymnsData';
import { audioSynthService } from '../../services/audioSynthService';
import { 
  Music, 
  Play, 
  Square, 
  BookOpen, 
  Sparkles, 
  Volume2, 
  Heart, 
  Radio, 
  FileText
} from 'lucide-react';

export const HymnsView: React.FC = () => {
  const [selectedHymnId, setSelectedHymnId] = useState<number>(hymnsData[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentNoteIdx, setCurrentNoteIdx] = useState<number | undefined>(undefined);

  const currentHymn = hymnsData.find((h) => h.id === selectedHymnId) || hymnsData[0];

  useEffect(() => {
    audioSynthService.setListener((playing, noteIdx) => {
      setIsPlaying(playing);
      setCurrentNoteIdx(noteIdx);
    });

    return () => {
      audioSynthService.stop();
    };
  }, []);

  const handlePlayToggle = () => {
    if (isPlaying) {
      audioSynthService.stop();
    } else {
      if (currentHymn.melodyNotes && currentHymn.melodyNotes.length > 0) {
        audioSynthService.playMelody(currentHymn.melodyNotes, currentHymn.tempoBpm || 88);
      }
    }
  };

  const handleSelectHymn = (id: number) => {
    if (isPlaying) {
      audioSynthService.stop();
    }
    setSelectedHymnId(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Title Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Music className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
            巡禮培靈詩歌本 (Devotional Hymns &amp; Choral Praise)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          手冊精選詩歌（如鹿切慕溪水、向高處行等），附帶真實管風琴音色旋律伴奏，適合團員在古跡與安息夜合唱靈修
        </p>
      </div>

      {/* Hymn Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {hymnsData.map((hymn) => {
          const isSelected = hymn.id === selectedHymnId;
          return (
            <button
              key={hymn.id}
              onClick={() => handleSelectHymn(hymn.id)}
              className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-amber-900/60 to-slate-900 border-amber-500 shadow-md shadow-amber-950'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isSelected ? 'text-amber-400' : 'text-slate-500'}`}>
                    第 {hymn.id} 首
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-800">
                    {hymn.musicKey || '調式'}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-100 mt-1">
                  {hymn.titleZh}
                </h3>
                {hymn.titleEn && (
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {hymn.titleEn}
                  </p>
                )}
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-amber-500/80 truncate">
                {hymn.theme}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Hymn Display Card */}
      <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        {/* Hymn Header & Play Controller */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950 font-mono">
                No. {currentHymn.id}
              </span>
              <span className="text-xs text-amber-400 font-mono">
                {currentHymn.musicKey || 'G Major'} · 拍速: {currentHymn.tempoBpm || 88} BPM
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              {currentHymn.titleZh}
            </h3>
            {currentHymn.titleEn && (
              <p className="text-sm text-slate-400 font-serif italic">
                {currentHymn.titleEn}
              </p>
            )}
          </div>

          {/* Interactive Synthesizer Audio Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePlayToggle}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-lg cursor-pointer ${
                isPlaying
                  ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                  : 'bg-amber-600 hover:bg-amber-500 text-white'
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-4 h-4 fill-white" />
                  <span>停止播放</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>管風琴伴奏播放</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                if (currentHymn.melodyNotes && currentHymn.melodyNotes[0]) {
                  audioSynthService.playNote(currentHymn.melodyNotes[0].note, 1.2);
                }
              }}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 transition cursor-pointer"
              title="定音 / 試聽首音"
            >
              <Volume2 className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Scripture foundation quote box */}
        <div className="p-4 rounded-xl bg-amber-950/20 border-l-4 border-amber-500 flex items-start gap-3 text-slate-300 text-xs sm:text-sm">
          <BookOpen className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-400 block mb-0.5">經文根基 (Scripture Foundation):</span>
            <p className="font-serif italic leading-relaxed text-amber-100">
              {currentHymn.scriptureFoundation}
            </p>
          </div>
        </div>

        {/* Lyrics Display */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/70 border border-slate-800 shadow-inner space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-800/80 pb-2">
            <span>詩歌全段歌詞 (Lyrics)</span>
            {isPlaying && (
              <span className="flex items-center gap-1.5 text-amber-400 font-mono">
                <Radio className="w-3.5 h-3.5 animate-spin" />
                正在彈奏聖樂旋律...
              </span>
            )}
          </div>

          <div className="space-y-3 font-serif text-slate-100 text-sm sm:text-base leading-loose max-w-2xl mx-auto py-2">
            {currentHymn.lyrics.map((line, idx) => (
              <p
                key={idx}
                className={`transition-all duration-300 ${
                  line.trim().startsWith('[') || line.trim().startsWith('（')
                    ? 'text-xs text-amber-400 font-sans font-bold pt-2'
                    : 'text-slate-200'
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Devotional Advice for Singing On Site */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-amber-300 block mb-0.5">巡禮現場敬拜提示:</span>
            在古腓立比露天劇場、呂底亞洗禮溪畔、或德爾菲山谷靜默處，團員可合唱此詩歌，體會保羅西拉在獄中「唱詩讚美神，眾囚犯也側耳而聽」的屬天喜樂與震撼。
          </div>
        </div>
      </div>
    </div>
  );
};
