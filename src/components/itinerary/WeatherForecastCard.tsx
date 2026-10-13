import React, { useState, useEffect, useCallback } from 'react';
import { DestinationWeatherData, DailyWeatherForecast } from '../../types';
import { weatherService, parseWmoWeatherCode } from '../../services/weatherService';
import { 
  CloudSun, 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  Snowflake, 
  Droplets, 
  Wind, 
  RefreshCw, 
  Compass, 
  Thermometer, 
  Sparkles, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface WeatherForecastCardProps {
  dayNumber: number;
}

export const WeatherForecastCard: React.FC<WeatherForecastCardProps> = ({ dayNumber }) => {
  const [weatherData, setWeatherData] = useState<DestinationWeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherService.fetch3DayForecast(dayNumber);
      setWeatherData(data);
    } catch (err) {
      console.error('Weather load error:', err);
      setError('暫時無法獲取即時天氣資訊');
    } finally {
      setLoading(false);
    }
  }, [dayNumber]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const renderWeatherIcon = (code: number, className = 'w-6 h-6') => {
    const parsed = parseWmoWeatherCode(code);
    switch (parsed.iconType) {
      case 'sun':
        return <Sun className={`${className} text-amber-400`} />;
      case 'cloud-sun':
        return <CloudSun className={`${className} text-amber-300`} />;
      case 'cloud':
        return <Cloud className={`${className} text-slate-300`} />;
      case 'rain':
        return <CloudRain className={`${className} text-blue-400`} />;
      case 'thunder':
        return <CloudLightning className={`${className} text-purple-400`} />;
      case 'snow':
        return <Snowflake className={`${className} text-cyan-300`} />;
      default:
        return <CloudSun className={`${className} text-amber-300`} />;
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/20 border border-sky-900/30 p-5 sm:p-6 shadow-xl space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-sky-950/60 border border-sky-800/40 text-sky-400 flex-shrink-0">
            <CloudSun className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm sm:text-base font-bold text-slate-100">
                目的地三日即時氣象預報 (3-Day Weather Forecast)
              </h4>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-950 text-sky-300 border border-sky-800/50">
                Live Open-Meteo API
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span>📍 {weatherData?.locationNameZh || '希臘景點'}</span>
              <span className="font-serif italic text-slate-500">({weatherData?.locationNameEn})</span>
              {weatherData && (
                <span className="font-mono text-[10px] text-slate-500 hidden md:inline">
                  [{weatherData.latitude.toFixed(2)}°N, {weatherData.longitude.toFixed(2)}°E]
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          {weatherData?.currentTemp !== undefined && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-semibold text-amber-300">
              <Thermometer className="w-3.5 h-3.5 text-amber-400" />
              <span>當前氣溫: {weatherData.currentTemp}°C</span>
              <span className="text-slate-400 font-normal text-[11px]">({weatherData.currentConditionZh})</span>
            </div>
          )}

          <button
            onClick={fetchWeather}
            disabled={loading}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-slate-200 border border-slate-700 transition cursor-pointer disabled:opacity-50"
            title="重新整理氣象預報"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Weather Content */}
      {loading && !weatherData ? (
        <div className="p-8 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
          <span>正在連接氣象 API 獲取 {dayNumber} 號巡禮目的地氣象數據...</span>
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/40 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      ) : weatherData ? (
        <div className="space-y-4">
          {/* 3-day forecast columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {weatherData.daily.map((dayForecast, idx) => {
              const isToday = idx === 0;
              return (
                <div
                  key={dayForecast.date}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    isToday
                      ? 'bg-gradient-to-b from-sky-950/40 to-slate-900 border-sky-500/50 shadow-md'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-bold ${isToday ? 'text-sky-300' : 'text-slate-300'}`}>
                        {dayForecast.dayLabel}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {dayForecast.date.slice(5)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 my-2">
                      <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 flex-shrink-0">
                        {renderWeatherIcon(dayForecast.weatherCode, 'w-7 h-7')}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-100">
                          {dayForecast.conditionZh}
                        </div>
                        <div className="text-[11px] text-slate-400 font-serif">
                          {dayForecast.conditionEn}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
                    {/* Temperature Range */}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">氣溫範圍:</span>
                      <span className="font-semibold text-slate-200">
                        <span className="text-rose-400">{dayForecast.tempMax}°</span>
                        <span className="text-slate-500 mx-1">/</span>
                        <span className="text-sky-400">{dayForecast.tempMin}°C</span>
                      </span>
                    </div>

                    {/* Rain probability */}
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Droplets className="w-3 h-3 text-blue-400" />
                        <span>降雨機率:</span>
                      </span>
                      <span className={`font-mono font-medium ${
                        dayForecast.precipitationProbability > 30 ? 'text-amber-400' : 'text-slate-300'
                      }`}>
                        {dayForecast.precipitationProbability}%
                      </span>
                    </div>

                    {/* Wind speed */}
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Wind className="w-3 h-3 text-slate-400" />
                        <span>最大風速:</span>
                      </span>
                      <span className="font-mono text-slate-300">
                        {dayForecast.windSpeedMax} km/h
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pilgrimage Advice Banner */}
          <div className="p-3.5 rounded-xl bg-sky-950/20 border border-sky-900/40 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-sky-300 block">
                巡禮參訪提醒與穿著建議 (Pilgrim Advisory):
              </span>
              <p>{weatherData.pilgrimageTip}</p>
            </div>
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-between text-[10px] text-slate-500 px-1">
            <span>資料即時解析：Open-Meteo Numerical Weather Prediction Models</span>
            <span>更新時間: {weatherData.updatedAt}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
