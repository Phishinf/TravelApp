import React, { useState } from 'react';
import {
  churchArchitectureIntro,
  architectureStyles,
  churchBuildingParts,
  featuredChurches,
  anatomyImage,
} from '../../data/churchArchitectureData';
import {
  Landmark,
  Sparkles,
  BookOpen,
  LayoutGrid,
  MapPin,
  Clock,
  CheckCircle2,
} from 'lucide-react';

// Attribution required by the Wikimedia Commons licenses
const ImageCredit: React.FC<{ credit?: string; sourceUrl?: string }> = ({ credit, sourceUrl }) =>
  credit ? (
    <a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-tts-skip
      className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-slate-950/70 text-[9px] text-slate-300 hover:text-amber-200 transition"
    >
      📷 {credit}
    </a>
  ) : null;

export const ChurchArchitectureView: React.FC = () => {
  const [selectedStyleId, setSelectedStyleId] = useState<string>(architectureStyles[0].id);
  const selectedStyle = architectureStyles.find((s) => s.id === selectedStyleId) || architectureStyles[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Title Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Landmark className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
            教會建築小百科 (Church Architecture &amp; Sacred Space)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          從家庭教會、巴西利卡大殿到拜占庭穹頂與懸空修道院：讀懂巡禮路上每一座教堂的空間神學
        </p>
      </div>

      {/* Hero Intro Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-900/50 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500 text-slate-950 font-mono">
            {churchArchitectureIntro.period}
          </span>
          <span className="text-xs text-amber-400 font-serif">
            {churchArchitectureIntro.titleEn}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
          {churchArchitectureIntro.titleZh}
        </h3>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-serif">
          {churchArchitectureIntro.leadSummary}
        </p>
      </div>

      {/* Architectural Styles Timeline */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          教堂建築形式演進 (Evolution of Church Forms)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {architectureStyles.map((style, idx) => {
            const isSelected = style.id === selectedStyleId;
            return (
              <button
                key={style.id}
                onClick={() => setSelectedStyleId(style.id)}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-amber-900/60 to-slate-900 border-amber-500 shadow-md shadow-amber-950'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className={`text-[10px] font-mono ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                  {idx + 1}. {style.period}
                </span>
                <span className={`block text-xs font-bold mt-1 ${isSelected ? 'text-amber-100' : 'text-slate-300'}`}>
                  {style.nameZh}
                </span>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-5">
          {selectedStyle.imageUrl && (
            <figure className="lg:col-span-2 relative bg-slate-950 min-h-56">
              <img
                key={selectedStyle.id}
                src={selectedStyle.imageUrl}
                alt={selectedStyle.imageCaption || selectedStyle.nameZh}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/90 to-transparent" />
              {selectedStyle.imageCaption && (
                <figcaption className="absolute bottom-7 left-3 right-3 text-[11px] text-slate-200">
                  {selectedStyle.imageCaption}
                </figcaption>
              )}
              <ImageCredit credit={selectedStyle.imageCredit} sourceUrl={selectedStyle.imageSourceUrl} />
            </figure>
          )}
          <div className="lg:col-span-3 p-5 sm:p-6 space-y-4">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-slate-100">{selectedStyle.nameZh}</h4>
            <p className="text-xs text-amber-400 font-serif mt-0.5">
              {selectedStyle.nameEn} · {selectedStyle.period}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{selectedStyle.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h5 className="text-xs font-semibold text-slate-400">建築特徵</h5>
              <ul className="space-y-1.5">
                {selectedStyle.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h5 className="text-xs font-semibold text-slate-400">巡禮路上的實例</h5>
              <ul className="space-y-1.5">
                {selectedStyle.examples.map((example, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Anatomy of a Church */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-slate-100">
              教堂空間解構指南 (Anatomy of a Church)
            </h3>
          </div>
          <span className="text-xs text-slate-400">由西向東，從入口走向至聖所</span>
        </div>

        <figure className="relative h-56 sm:h-72 rounded-xl overflow-hidden bg-slate-950">
          <img
            src={anatomyImage.imageUrl}
            alt={anatomyImage.imageCaption}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/90 to-transparent" />
          <figcaption className="absolute bottom-7 left-3 right-3 text-[11px] text-slate-200">
            {anatomyImage.imageCaption}
          </figcaption>
          <ImageCredit credit={anatomyImage.imageCredit} sourceUrl={anatomyImage.imageSourceUrl} />
        </figure>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {churchBuildingParts.map((part, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-900/50 space-y-1.5 transition"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-950 border border-amber-700 text-amber-300 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </span>
                <h4 className="text-xs font-bold text-amber-300">
                  {part.nameZh} <span className="text-slate-500 font-normal">({part.nameEn})</span>
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-serif">{part.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Churches on the Pilgrimage Route */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
          <Landmark className="w-4 h-4" />
          巡禮路線重點教堂 (Featured Churches on Our Route)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featuredChurches.map((church) => (
            <div
              key={church.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-700/60 shadow-md overflow-hidden transition group"
            >
              {church.imageUrl && (
                <div className="relative h-48 bg-slate-950 overflow-hidden">
                  <img
                    src={church.imageUrl}
                    alt={church.nameZh}
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <ImageCredit credit={church.imageCredit} sourceUrl={church.imageSourceUrl} />
                </div>
              )}
              <div className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-100">{church.nameZh}</h4>
                  <p className="text-[11px] text-amber-400 font-serif">{church.nameEn}</p>
                </div>
                <span className="px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-[10px] text-amber-300 flex items-center gap-1 flex-shrink-0">
                  <MapPin className="w-3 h-3" />
                  {church.cityZh}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap text-[11px]">
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3 h-3" />
                  {church.period}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-800/50 text-amber-200">
                  {church.styleZh}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{church.description}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {church.highlights.map((h, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300"
                  >
                    ✦ {h}
                  </span>
                ))}
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practical Pilgrimage Tip */}
      <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-900/40 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-slate-300 leading-relaxed">
          <span className="font-bold text-amber-300 block">參觀希臘教堂與修道院小提醒:</span>
          進入教堂與修道院須穿著端莊：男士穿長褲，女士穿過膝裙子並遮蓋肩膀（邁泰奧拉修道院入口通常備有圍裙可借用）。教堂內請降低音量，禮拜進行中避免走動與拍照；許多壁畫禁止使用閃光燈。不妨先站在前廊，由西向東慢慢走向聖障，體會建築從「世界」走向「天國」的空間敘事。
        </div>
      </div>
    </div>
  );
};
