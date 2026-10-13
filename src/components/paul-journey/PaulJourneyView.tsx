import React, { useState } from 'react';
import { PaulJourneyStage } from '../../types';
import { paulJourneyData } from '../../data/paulJourneyData';
import { JourneyMap } from './JourneyMap';
import { 
  Compass, 
  MapPin, 
  Users, 
  BookOpen, 
  Scroll, 
  ArrowRight, 
  Calendar,
  Sparkles,
  ShieldAlert,
  Send
} from 'lucide-react';

interface PaulJourneyViewProps {
  onOpenScriptureDrawer?: () => void;
}

export const PaulJourneyView: React.FC<PaulJourneyViewProps> = ({ onOpenScriptureDrawer }) => {
  const [selectedJourneyId, setSelectedJourneyId] = useState<string>(paulJourneyData[1].id); // default to 2nd journey (Europe/Greece)
  const [selectedStopIndex, setSelectedStopIndex] = useState<number | null>(null);

  const currentJourney = paulJourneyData.find((j) => j.id === selectedJourneyId) || paulJourneyData[1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Title Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
            使徒保羅宣教行程考證 (Paul&apos;s Missionary Journeys)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          依據新約使徒行傳與保羅書信考據，重現保羅四次傳道宣教路線、同工陣容與書信著作年代
        </p>
      </div>

      {/* Journey Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {paulJourneyData.map((journey) => {
          const isSelected = journey.id === selectedJourneyId;
          return (
            <button
              key={journey.id}
              onClick={() => {
                setSelectedJourneyId(journey.id);
                setSelectedStopIndex(null);
              }}
              className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-amber-900/60 to-slate-900 border-amber-500 shadow-md shadow-amber-950'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isSelected ? 'text-amber-400' : 'text-slate-400'}`}>
                    {typeof journey.journeyNumber === 'number' ? `旅程第 ${journey.journeyNumber} 次` : '第四段行程'}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">{journey.years}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-100 mt-1">
                  {journey.journeyNameZh}
                </h3>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                <span>同行: {journey.companions.slice(0, 2).join('、')}</span>
                <span className="text-amber-400 font-medium">查看路線 →</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Journey Detailed Blueprint */}
      <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-xl space-y-6">
        {/* Header stats */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950">
                {currentJourney.years}
              </span>
              <span className="text-xs text-amber-400 font-mono">
                {currentJourney.journeyName}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-100 mt-1">
              {currentJourney.journeyNameZh}
            </h3>
          </div>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>同行同工: {currentJourney.companions.join('、')}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300">
              <Scroll className="w-3.5 h-3.5 text-amber-400" />
              <span>所著書信: {currentJourney.associatedEpistles.join('、') || '無著書記錄'}</span>
            </div>
          </div>
        </div>

        {/* Narrative Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              行程總述與屬靈進程
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed">
              {currentJourney.summaryZh}
            </p>

            <div className="pt-2">
              <h5 className="text-xs font-semibold text-slate-400 mb-1">
                聖經章節查考依據:
              </h5>
              <div className="flex flex-wrap gap-2">
                {currentJourney.keyPassages.map((passage, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-slate-800 text-xs text-amber-300 border border-slate-700 font-mono"
                  >
                    📖 {passage}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Historical Impact card */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5 text-amber-400" />
              教會歷史與救贖歷史意義
            </h4>
            <p className="text-xs text-amber-200/90 leading-relaxed font-serif">
              {currentJourney.historicalImpact}
            </p>
          </div>
        </div>

        {/* Interactive Route Stepper */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              宣教路線站點循序 (Journey Route Timeline)
            </h4>
            <span className="text-[11px] text-slate-400">
              共 {currentJourney.route.length} 個主要經由站點
            </span>
          </div>

          {currentJourney.routeCoords && (
            <JourneyMap
              journey={currentJourney}
              selectedStopIndex={selectedStopIndex}
              onSelectStop={setSelectedStopIndex}
            />
          )}

          <div className="flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none">
            {currentJourney.route.map((station, idx) => {
              const isSelected = selectedStopIndex === idx;
              return (
                <div key={idx} className="flex items-center flex-shrink-0">
                  <button
                    onClick={() => setSelectedStopIndex(idx)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-slate-900/40 text-[10px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span>{station}</span>
                  </button>
                  {idx < currentJourney.route.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 mx-1 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Comparative Overview Table from Image 20261013_152106 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scroll className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-slate-100">
              四次宣教旅程全景對照表 (Comparative Overview)
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            摘錄自朝聖手冊第 8 頁「保羅各次傳道行程圖表」
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400">
                <th className="p-3 font-semibold">次數</th>
                <th className="p-3 font-semibold">年代</th>
                <th className="p-3 font-semibold">同行同工</th>
                <th className="p-3 font-semibold">主要行程與據點</th>
                <th className="p-3 font-semibold">成書書信</th>
                <th className="p-3 font-semibold">聖經記載</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {paulJourneyData.map((j) => (
                <tr key={j.id} className="hover:bg-slate-800/50 transition">
                  <td className="p-3 font-bold text-amber-300 whitespace-nowrap">
                    {j.journeyNameZh}
                  </td>
                  <td className="p-3 font-mono text-slate-400 whitespace-nowrap">
                    {j.years}
                  </td>
                  <td className="p-3 text-slate-300">
                    {j.companions.join('、')}
                  </td>
                  <td className="p-3 text-slate-300 max-w-xs">
                    {j.route.slice(0, 5).join(' → ')} ...
                  </td>
                  <td className="p-3 font-medium text-amber-200">
                    {j.associatedEpistles.join('、') || '—'}
                  </td>
                  <td className="p-3 text-slate-400 whitespace-nowrap">
                    {j.keyPassages[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
