import React, { useEffect, useMemo, useState } from 'react';
import { GreekPhrase } from '../../types';
import { greekPhraseCategories, allGreekPhrases } from '../../data/greekPhrasesData';
import { greekVoiceService, greekSimilarity } from '../../services/greekVoiceService';
import { Languages, Volume2, Mic, MicOff, Turtle, Ear, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

type ListenTarget = 'interpret' | string;

interface PracticeResult {
  heard: string;
  score: number;
}

interface InterpretResult {
  heard: string;
  matches: (GreekPhrase & { categoryZh: string; score: number })[];
}

const scoreFeedback = (score: number) => {
  if (score >= 85) return { text: '太棒了！發音非常接近 👏', color: 'text-emerald-300', bar: 'bg-emerald-500' };
  if (score >= 60) return { text: '不錯！再聽一次慢速示範，注意重音位置。', color: 'text-amber-300', bar: 'bg-amber-500' };
  return { text: '再試一次：先按「慢速」聽清楚，再跟著拼音讀。', color: 'text-rose-300', bar: 'bg-rose-500' };
};

export const GreekPhrasesView: React.FC = () => {
  const [categoryId, setCategoryId] = useState<string>('all');
  const [listeningFor, setListeningFor] = useState<ListenTarget | null>(null);
  const [interim, setInterim] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [practice, setPractice] = useState<Record<string, PracticeResult>>({});
  const [interpret, setInterpret] = useState<InterpretResult | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [hasGreekVoice, setHasGreekVoice] = useState(greekVoiceService.hasGreekVoice());

  const canListen = greekVoiceService.canListen();
  const canSpeak = greekVoiceService.canSpeak();

  // Voices load asynchronously in Chrome and Safari
  useEffect(() => {
    if (!canSpeak) return;
    const update = () => setHasGreekVoice(greekVoiceService.hasGreekVoice());
    update();
    window.speechSynthesis.addEventListener?.('voiceschanged', update);
    return () => window.speechSynthesis.removeEventListener?.('voiceschanged', update);
  }, [canSpeak]);

  // Release the microphone and stop audio when leaving the page
  useEffect(
    () => () => {
      greekVoiceService.stopListening();
      greekVoiceService.stopSpeaking();
    },
    []
  );

  const categories = useMemo(
    () => (categoryId === 'all' ? greekPhraseCategories : greekPhraseCategories.filter((c) => c.id === categoryId)),
    [categoryId]
  );

  const play = (phrase: GreekPhrase, slow = false) => {
    const id = `${phrase.id}${slow ? '-slow' : ''}`;
    setPlayingId(id);
    greekVoiceService.speak(phrase.greek, slow ? 0.6 : 0.9, () => setPlayingId((cur) => (cur === id ? null : cur)));
  };

  const startListening = (target: ListenTarget) => {
    if (listeningFor === target) {
      greekVoiceService.stopListening();
      return;
    }
    setError(null);
    setInterim('');
    setListeningFor(target);
    if (target === 'interpret') setInterpret(null);

    greekVoiceService.listen({
      onInterim: setInterim,
      onFinal: (alternatives) => {
        setInterim('');
        if (target === 'interpret') {
          const heard = alternatives[0] ?? '';
          const matches = allGreekPhrases
            .map((p) => ({ ...p, score: Math.max(...alternatives.map((alt) => greekSimilarity(alt, p.greek))) }))
            .filter((p) => p.score >= 40)
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
          setInterpret({ heard, matches });
        } else {
          const phrase = allGreekPhrases.find((p) => p.id === target);
          if (!phrase) return;
          // Score against whichever recognition alternative is closest to the target
          const best = alternatives
            .map((alt) => ({ heard: alt, score: greekSimilarity(alt, phrase.greek) }))
            .sort((a, b) => b.score - a.score)[0];
          if (best) setPractice((prev) => ({ ...prev, [target]: best }));
        }
      },
      onError: setError,
      onEnd: () => setListeningFor((cur) => (cur === target ? null : cur)),
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Title Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Languages className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">希臘語旅遊會話 (Everyday Greek for Travellers)</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          按 🔊 聽希臘語發音，按 🎤 跟讀練習；或用「聽懂當地人」讓手機辨識對方說的希臘語
        </p>
      </div>

      {/* Capability notices */}
      {(!canSpeak || !hasGreekVoice || !canListen) && (
        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 text-xs text-amber-200 space-y-1.5" data-tts-skip>
          {!canSpeak && (
            <p className="flex gap-2"><AlertCircle className="w-4 h-4 flex-shrink-0" />此瀏覽器不支援語音播放。</p>
          )}
          {canSpeak && !hasGreekVoice && (
            <p className="flex gap-2">
              <Info className="w-4 h-4 flex-shrink-0" />
              此裝置未安裝希臘語語音，發音可能不準確。iPhone／iPad：設定 › 輔助使用 › 朗讀內容 › 聲音 › 希臘文（如：Melina）；Android／Windows：在文字轉語音設定加入「希臘文」語音。
            </p>
          )}
          {!canListen && (
            <p className="flex gap-2">
              <MicOff className="w-4 h-4 flex-shrink-0" />
              此瀏覽器不支援語音辨識（麥克風功能），請改用 Chrome、Edge 或 Safari。
            </p>
          )}
        </div>
      )}

      {/* Interpret: capture a local speaking Greek */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-900 border border-blue-900/50 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Ear className="w-5 h-5 text-blue-300" />
              聽懂當地人 (Speech to Text)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              按下麥克風，請對方對著手機說希臘語。系統會顯示辨識出的希臘文，並從本頁會話中找出最接近的句子與中文意思。
            </p>
          </div>
          <button
            onClick={() => startListening('interpret')}
            disabled={!canListen}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 ${
              listeningFor === 'interpret'
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {listeningFor === 'interpret' ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            {listeningFor === 'interpret' ? '正在聆聽…（按此停止）' : '開始聆聽希臘語'}
          </button>
        </div>

        {listeningFor === 'interpret' && interim && (
          <p className="text-sm text-blue-200 font-serif italic" lang="el" data-tts-skip>{interim}</p>
        )}

        {interpret && (
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="text-xs text-slate-400">
              辨識結果：
              <span className="text-base text-slate-100 font-serif ml-1" lang="el" data-tts-skip>
                {interpret.heard || '（未能辨識）'}
              </span>
            </div>
            {interpret.matches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {interpret.matches.map((m) => (
                  <div key={m.id} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] text-slate-500">{m.categoryZh} · 相似度 {m.score}%</span>
                      <button
                        onClick={() => play(m)}
                        className="p-1 rounded-md text-blue-300 hover:bg-slate-800 cursor-pointer"
                        aria-label={`播放 ${m.greek}`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-slate-100" lang="el" data-tts-skip>{m.greek}</p>
                    <p className="text-sm text-amber-300">{m.zh}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                找不到相近的會話句子。可請對方說慢一點，或改用翻譯應用程式。
              </p>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-200 flex gap-2" data-tts-skip>
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[{ id: 'all', titleZh: '全部會話' }, ...greekPhraseCategories].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryId(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition cursor-pointer whitespace-nowrap flex-shrink-0 ${
              categoryId === cat.id
                ? 'bg-amber-600 text-white font-semibold shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-amber-200 border border-slate-800'
            }`}
          >
            {cat.titleZh}
          </button>
        ))}
      </div>

      {/* Phrase cards */}
      {categories.map((cat) => (
        <section key={cat.id} className="space-y-3">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
            {cat.titleZh} <span className="text-slate-500 font-normal normal-case">({cat.titleEn})</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.phrases.map((phrase) => {
              const result = practice[phrase.id];
              const isListening = listeningFor === phrase.id;
              const feedback = result ? scoreFeedback(result.score) : null;
              return (
                <div
                  key={phrase.id}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-700/50 shadow-md space-y-2 transition"
                >
                  <p className="text-lg font-bold text-slate-100" lang="el" data-tts-skip>{phrase.greek}</p>
                  <p className="text-xs text-amber-400/90 font-mono" data-tts-skip>{phrase.translit}</p>
                  <p className="text-sm text-slate-200">{phrase.zh}</p>
                  {phrase.note && <p className="text-[11px] text-slate-400 leading-relaxed">💡 {phrase.note}</p>}

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => play(phrase)}
                      disabled={!canSpeak}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer disabled:opacity-40 ${
                        playingId === phrase.id
                          ? 'bg-amber-500 border-amber-500 text-slate-950'
                          : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      播放
                    </button>
                    <button
                      onClick={() => play(phrase, true)}
                      disabled={!canSpeak}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer disabled:opacity-40 ${
                        playingId === `${phrase.id}-slow`
                          ? 'bg-amber-500 border-amber-500 text-slate-950'
                          : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      <Turtle className="w-3.5 h-3.5" />
                      慢速
                    </button>
                    <button
                      onClick={() => startListening(phrase.id)}
                      disabled={!canListen}
                      className={`ml-auto flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer disabled:opacity-40 ${
                        isListening
                          ? 'bg-rose-600 border-rose-600 text-white animate-pulse'
                          : 'bg-amber-900/40 border-amber-700/50 text-amber-200 hover:bg-amber-900/60'
                      }`}
                    >
                      {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                      {isListening ? '聆聽中…' : '跟讀'}
                    </button>
                  </div>

                  {isListening && interim && (
                    <p className="text-xs text-slate-400 italic" lang="el" data-tts-skip>{interim}</p>
                  )}

                  {result && feedback && !isListening && (
                    <div className="pt-2 border-t border-slate-800 space-y-1.5" data-tts-skip>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">
                          聽到：<span className="text-slate-200 font-serif" lang="el">{result.heard}</span>
                        </span>
                        <span className={`font-bold ${feedback.color}`}>{result.score}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className={`h-full ${feedback.bar}`} style={{ width: `${result.score}%` }} />
                      </div>
                      <p className={`text-[11px] flex items-center gap-1 ${feedback.color}`}>
                        {result.score >= 85 && <CheckCircle2 className="w-3 h-3" />}
                        {feedback.text}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <p className="text-[11px] text-slate-500 leading-relaxed">
        語音辨識使用瀏覽器內建的 Web Speech API，Chrome 與 Safari 會將錄音傳送至 Google／Apple 伺服器處理，需要網絡連線；首次使用時瀏覽器會詢問麥克風權限。
      </p>
    </div>
  );
};
