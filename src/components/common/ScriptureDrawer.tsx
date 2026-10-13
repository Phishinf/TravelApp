import React, { useState } from 'react';
import { X, BookOpen, Copy, Check, ExternalLink, Bookmark } from 'lucide-react';

interface ScripturePassage {
  id: string;
  book: string;
  chapter: string;
  titleZh: string;
  locationContext: string;
  scriptureText: string;
  significance: string;
}

const PASSAGES: ScripturePassage[] = [
  {
    id: 'acts-16-mac-call',
    book: '使徒行傳',
    chapter: '16:6-10',
    titleZh: '馬其頓的呼聲（宣教進入歐洲）',
    locationContext: '特羅亞 → 尼亞波利 / 腓立比',
    scriptureText: '聖靈既然禁止他們在亞西亞講道，他們就經過弗呂家、加拉太一帶地方。到了每西亞的邊界，他們想要往庇推尼去，耶穌的靈卻不許。他們就越過每西亞，下到特羅亞。在夜間有異象現與保羅：有一個馬其頓人站著求他說：「請你過到馬其頓來幫助我們！」保羅既看見這異象，我們隨即想要往馬其頓去，以為神召我們傳福音給那裡的人。',
    significance: '福音歷史的重大轉捩點，福音跨越愛琴海，從亞洲正式傳入歐洲大陸。'
  },
  {
    id: 'acts-16-lydia-jailer',
    book: '使徒行傳',
    chapter: '16:11-34',
    titleZh: '腓立比：呂底亞信主與獄中半夜讚美',
    locationContext: '腓立比 (Philippi) 河邊與監獄',
    scriptureText: '當安息日，我們走出城門，到了河邊，知道那裡有一個禱告的地方，我們就坐下對那聚會的婦女講道。有一個賣紫色布疋的婦人，名叫呂底亞，是推雅推喇城的人，素來敬拜神。她聽見了，主就開導她的心，叫她留心聽保羅所講的話。她和她一家既領了洗... 約在半夜，保羅和西拉禱告，唱詩讚美神，眾囚犯也側耳而聽。忽然，地大震動，甚至監牢的地基都搖動了，監門立刻全開，眾囚犯的鎖鍊也都鬆開了... 禁卒說：「二位先生，我當怎樣行才可以得救？」他們說：「當信主耶穌，你和你一家都必得救。」',
    significance: '歐洲第一個歸主信徒（呂底亞）在此受洗；保羅西拉在患難牢獄中的敬拜讚美帶下神的榮耀。'
  },
  {
    id: 'acts-17-thess-berea',
    book: '使徒行傳',
    chapter: '17:1-12',
    titleZh: '帖撒羅尼迦本著聖經辯論與庇哩亞賢明查經',
    locationContext: '帖撒羅尼迦 & 庇哩亞 (Thessaloniki & Berea)',
    scriptureText: '保羅照他素常的規矩進去，一連三個安息日，本著聖經與他們辯論，講解陳明基督必須受害，從死裡復活；又說：「我所傳與你們的這位耶穌就是基督。」... 這地的人賢於帖撒羅尼迦的人，甘心領受這道，天天考查聖經，要曉得這道是與不是。所以他們中間多有相信的，又有希臘尊貴的婦女，並且男也不少。',
    significance: '樹立了基督徒「天天查考聖經」以真理驗證道理的典範（Berea mindset）。'
  },
  {
    id: 'acts-17-athens-areopagus',
    book: '使徒行傳',
    chapter: '17:16-34',
    titleZh: '雅典亞略巴古（戰神山）向希臘學者講道',
    locationContext: '雅典 (Athens) 亞略巴古 (Areopagus / Mars Hill)',
    scriptureText: '保羅在雅典等候他們的時候，看見滿城都是偶像，就心裡著急... 保羅站在亞略巴古當中，說：「眾位雅典人哪，我看你們凡事很敬畏鬼神。我遊行的時候，觀看你們所敬拜的，遇見一座壇，上面寫著『未識之神』。你們所不認識而敬拜的，我現在告訴你們。創造宇宙和其中萬物的神，既是天地的主，就不住人手所造的殿... 世人蒙昧無知的時候，神並不鑒察，如今卻吩咐各處的人都要悔改。」',
    significance: '保羅以跨文化敏銳度對話斯多葛與以彼古羅哲學家，闡明獨一創造主與死裡復活的基督。'
  },
  {
    id: 'acts-18-corinth',
    book: '使徒行傳',
    chapter: '18:1-11',
    titleZh: '哥林多：織帳棚與夜間得主異象堅固',
    locationContext: '哥林多 (Corinth)',
    scriptureText: '遇見一個猶太人，名叫亞居拉... 還有他的妻百基拉。保羅就投奔了他們。他們本是製造帳棚為業。保羅因與他們同業，就和他們同住做工... 夜間，主在異象中對保羅說：「不要怕，只管講，不要閉口，有我與你同在，必沒有人下手害你，因為在這城裡我有許多的百姓。」保羅在那裡住了一年零六個月，將神的道教訓他們。',
    significance: '保羅在宣教中心哥林多建立了深厚根基，並在此地寫下給帖撒羅尼迦等教會的多封重要書信。'
  },
  {
    id: 'phil-3-13',
    book: '腓立比書',
    chapter: '3:13-14',
    titleZh: '向著標竿直跑',
    locationContext: '保羅獄中致腓立比教會書信',
    scriptureText: '弟兄們，我不是以為自己已經得著了；我只有一件事，就是忘記背後，努力面前的，向著標竿直跑，要得神在基督耶穌裡從上面召我來得的獎賞。',
    significance: '腓立比巡禮時的經典勉勵：基督徒生命應竭力追求認識基督耶穌，奔跑屬天賽程。'
  },
  {
    id: '1thess-5-16',
    book: '帖撒羅尼迦前書',
    chapter: '5:16-18',
    titleZh: '帖撒羅尼迦信徒的生活準則',
    locationContext: '保羅寫給帖撒羅尼迦教會',
    scriptureText: '要常常喜樂，不住的禱告，凡事謝恩；因為這是神在基督耶穌裡向你們所定的旨意。不要消滅聖靈的感動；不要藐視先知的講論。但要凡事察驗；善美的要持守，各樣的惡事要禁戒不做。',
    significance: '朝聖者在希臘旅途中的靈命定海神針，在任何境遇中操練感恩與不住禱告。'
  },
  {
    id: '1cor-13',
    book: '哥林多前書',
    chapter: '13:4-8',
    titleZh: '愛的頌歌',
    locationContext: '致問題叢生的哥林多教會',
    scriptureText: '愛是恆久忍耐，又有恩慈；愛是不嫉妒；愛是不自誇，不張狂，不做害羞的事，不求自己的益處，不輕易發怒，不計算人的惡，不喜歡不義，只喜歡真理；凡事包容，凡事相信，凡事盼望，凡事忍耐。愛是永不止息。',
    significance: '在繁華富庶而道德敗壞的古哥林多城，保羅啟示了超越一切恩賜的最高道路——神聖無私的愛（Agape）。'
  }
];

interface ScriptureDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenJournalWithVerse?: (ref: string, text: string) => void;
}

export const ScriptureDrawer: React.FC<ScriptureDrawerProps> = ({
  isOpen,
  onClose,
  onOpenJournalWithVerse
}) => {
  const [selectedId, setSelectedId] = useState<string>(PASSAGES[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentPassage = PASSAGES.find((p) => p.id === selectedId) || PASSAGES[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-2xl bg-slate-900 border-l border-amber-900/40 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-950/50 border border-amber-800/40 text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">聖經關鍵經文速查 (Scripture Companion)</h2>
              <p className="text-xs text-slate-400">使徒行傳希臘行、腓立比書、帖前後書、哥林多前後書</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Horizontal tabs selector */}
        <div className="px-4 py-2 border-b border-slate-800/80 bg-slate-950/50 flex gap-1.5 overflow-x-auto scrollbar-none">
          {PASSAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition cursor-pointer flex-shrink-0 ${
                selectedId === p.id
                  ? 'bg-amber-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-amber-200'
              }`}
            >
              {p.book} {p.chapter}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Main Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900 border border-amber-900/40 shadow-inner">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-950 border border-amber-800/60 text-amber-300">
                  {currentPassage.locationContext}
                </span>
                <h3 className="text-lg font-bold text-amber-100 mt-2">
                  {currentPassage.titleZh}
                </h3>
                <p className="text-xs text-amber-400 font-mono mt-0.5">
                  {currentPassage.book} {currentPassage.chapter}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(`${currentPassage.book} ${currentPassage.chapter}\n\n${currentPassage.scriptureText}`, currentPassage.id)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer flex items-center gap-1 text-xs"
                  title="複製經文"
                >
                  {copiedId === currentPassage.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">已複製</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>複製</span>
                    </>
                  )}
                </button>
                {onOpenJournalWithVerse && (
                  <button
                    onClick={() => {
                      onOpenJournalWithVerse(
                        `${currentPassage.book} ${currentPassage.chapter}`,
                        currentPassage.scriptureText
                      );
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-amber-900/40 hover:bg-amber-900/70 text-amber-300 border border-amber-700/50 transition cursor-pointer flex items-center gap-1 text-xs"
                    title="引導至研經日誌"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>記入日誌</span>
                  </button>
                )}
              </div>
            </div>

            {/* Scripture text with liturgical quote border */}
            <div className="p-4 rounded-xl bg-slate-950/70 border-l-4 border-amber-500 text-slate-200 text-sm leading-relaxed whitespace-pre-line font-serif">
              &quot;{currentPassage.scriptureText}&quot;
            </div>

            {/* Significance */}
            <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-start gap-2">
              <span className="text-amber-400 font-medium flex-shrink-0">📜 巡禮研讀意義:</span>
              <span className="leading-relaxed">{currentPassage.significance}</span>
            </div>
          </div>

          {/* Quick list of other key verses */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              所有巡禮核心經文索引
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PASSAGES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    selectedId === p.id
                      ? 'bg-amber-950/40 border-amber-500/60 text-amber-200'
                      : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="font-semibold text-xs text-amber-300 truncate">{p.titleZh}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{p.book} {p.chapter}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
