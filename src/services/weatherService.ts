import { DestinationWeatherData, DailyWeatherForecast } from '../types';

interface DestinationLocation {
  dayNumber: number;
  cityZh: string;
  cityEn: string;
  lat: number;
  lng: number;
  terrainContext: string;
}

export const DESTINATION_COORDINATES: Record<number, DestinationLocation> = {
  1: {
    dayNumber: 1,
    cityZh: '迦華拿 / 尼亞波利',
    cityEn: 'Kavala / Neapolis',
    lat: 40.9396,
    lng: 24.4147,
    terrainContext: '愛琴海海濱港口，海風較為清新',
  },
  2: {
    dayNumber: 2,
    cityZh: '腓立比古城 & 卡瓦拉',
    cityEn: 'Philippi & Kavala',
    lat: 41.0135,
    lng: 24.2847,
    terrainContext: '古城平原與露天遺址，石階與泥徑較多',
  },
  3: {
    dayNumber: 3,
    cityZh: '帖撒羅尼迦 & 庇哩亞',
    cityEn: 'Thessaloniki & Berea',
    lat: 40.6401,
    lng: 22.9444,
    terrainContext: '馬其頓核心城市與皮埃里亞山麓',
  },
  4: {
    dayNumber: 4,
    cityZh: '邁泰奧拉 / 卡蘭巴卡',
    cityEn: 'Meteora / Kalambaka',
    lat: 39.7067,
    lng: 21.6267,
    terrainContext: '巨石險峰山區，修道院攀爬石階較陡峭，早晚溫差顯著',
  },
  5: {
    dayNumber: 5,
    cityZh: '德爾菲古代聖域',
    cityEn: 'Delphi Archaeological Sanctuary',
    lat: 38.4801,
    lng: 22.4958,
    terrainContext: '帕納蘇斯山麓斜坡，陽光強烈且步道傾斜',
  },
  6: {
    dayNumber: 6,
    cityZh: '雅典衛城 & 亞略巴古 (戰神山)',
    cityEn: 'Athens Acropolis & Mars Hill',
    lat: 37.9715,
    lng: 23.7257,
    terrainContext: '衛城石灰岩與亞略巴古古大理石階極其光滑，陽光直射',
  },
  7: {
    dayNumber: 7,
    cityZh: '古哥林多審判台 & 堅革哩',
    cityEn: 'Ancient Corinth & Cenchreae',
    lat: 37.9056,
    lng: 22.8797,
    terrainContext: '伯羅奔尼撒地峽開闊古蹟區，遮蔽處較少',
  },
  8: {
    dayNumber: 8,
    cityZh: '雅典市中心與考古博物館',
    cityEn: 'Athens Center & National Museum',
    lat: 37.9892,
    lng: 23.7327,
    terrainContext: '都會步道與室內博物館',
  },
  9: {
    dayNumber: 9,
    cityZh: '蘇尼恩角愛琴海之畔',
    cityEn: 'Cape Sounion & Aegean Coast',
    lat: 37.6501,
    lng: 24.0298,
    terrainContext: '海角懸崖頂端，海風強勁，落日時分紫外線與風力並存',
  },
  10: {
    dayNumber: 10,
    cityZh: '雅典國際機場',
    cityEn: 'Athens International Airport',
    lat: 37.9838,
    lng: 23.7275,
    terrainContext: '雅典都會區',
  },
};

// Weather code translation according to WMO standards
export function parseWmoWeatherCode(code: number): {
  conditionZh: string;
  conditionEn: string;
  iconType: 'sun' | 'cloud-sun' | 'cloud' | 'rain' | 'thunder' | 'snow' | 'fog';
} {
  switch (code) {
    case 0:
      return { conditionZh: '晴空萬里', conditionEn: 'Clear Sky', iconType: 'sun' };
    case 1:
      return { conditionZh: '大致晴朗', conditionEn: 'Mainly Clear', iconType: 'sun' };
    case 2:
      return { conditionZh: '晴間多雲', conditionEn: 'Partly Cloudy', iconType: 'cloud-sun' };
    case 3:
      return { conditionZh: '多雲陰天', conditionEn: 'Overcast', iconType: 'cloud' };
    case 45:
    case 48:
      return { conditionZh: '晨霧瀰漫', conditionEn: 'Foggy', iconType: 'fog' };
    case 51:
    case 53:
    case 55:
      return { conditionZh: '有微雨/毛毛雨', conditionEn: 'Light Drizzle', iconType: 'rain' };
    case 61:
    case 63:
    case 65:
      return { conditionZh: '有雨', conditionEn: 'Rain', iconType: 'rain' };
    case 71:
    case 73:
    case 75:
      return { conditionZh: '降雪', conditionEn: 'Snow', iconType: 'snow' };
    case 80:
    case 81:
    case 82:
      return { conditionZh: '短暫陣雨', conditionEn: 'Rain Showers', iconType: 'rain' };
    case 95:
    case 96:
    case 99:
      return { conditionZh: '雷陣雨', conditionEn: 'Thunderstorm', iconType: 'thunder' };
    default:
      return { conditionZh: '天候良好', conditionEn: 'Fair Weather', iconType: 'cloud-sun' };
  }
}

// In-memory weather cache: key = `lat,lng`, expires after 10 minutes
interface CacheEntry {
  data: DestinationWeatherData;
  timestamp: number;
}
const weatherCache = new Map<string, CacheEntry>();
const CACHE_DURATION_MS = 10 * 60 * 1000;

export const weatherService = {
  getDestinationInfo(dayNumber: number): DestinationLocation {
    return DESTINATION_COORDINATES[dayNumber] || DESTINATION_COORDINATES[1];
  },

  async fetch3DayForecast(dayNumber: number): Promise<DestinationWeatherData> {
    const dest = this.getDestinationInfo(dayNumber);
    const cacheKey = `${dest.lat.toFixed(4)},${dest.lng.toFixed(4)}`;

    const cached = weatherCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION_MS) {
      return cached.data;
    }

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${dest.lat}&longitude=${dest.lng}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max&current_weather=true&timezone=Europe%2FAthens&forecast_days=3`;
      
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Weather API responded with status ${res.status}`);
      }

      const json = await res.json();
      const dailyTimes: string[] = json.daily?.time || [];
      const dailyCodes: number[] = json.daily?.weathercode || [];
      const dailyMaxs: number[] = json.daily?.temperature_2m_max || [];
      const dailyMins: number[] = json.daily?.temperature_2m_min || [];
      const dailyPrecip: number[] = json.daily?.precipitation_probability_max || [];
      const dailyWind: number[] = json.daily?.windspeed_10m_max || [];

      const currentTemp = json.current_weather?.temperature;
      const currentWeatherCode = json.current_weather?.weathercode ?? dailyCodes[0] ?? 0;
      const currentParsed = parseWmoWeatherCode(currentWeatherCode);

      const dayLabels = ['今天 (Today)', '明天 (Tomorrow)', '後天 (Day 3)'];
      const dailyForecasts: DailyWeatherForecast[] = dailyTimes.slice(0, 3).map((timeStr, idx) => {
        const code = dailyCodes[idx] ?? 0;
        const parsed = parseWmoWeatherCode(code);
        return {
          date: timeStr,
          dayLabel: dayLabels[idx] || `第 ${idx + 1} 天`,
          weatherCode: code,
          conditionZh: parsed.conditionZh,
          conditionEn: parsed.conditionEn,
          tempMax: Math.round(dailyMaxs[idx] ?? 22),
          tempMin: Math.round(dailyMins[idx] ?? 14),
          precipitationProbability: Math.round(dailyPrecip[idx] ?? 0),
          windSpeedMax: Math.round(dailyWind[idx] ?? 10),
        };
      });

      // Craft custom pilgrimage advice based on conditions & destination
      const tip = this.generatePilgrimageTip(dest, dailyForecasts[0]);

      const result: DestinationWeatherData = {
        locationNameZh: dest.cityZh,
        locationNameEn: dest.cityEn,
        latitude: dest.lat,
        longitude: dest.lng,
        currentTemp: currentTemp !== undefined ? Math.round(currentTemp) : undefined,
        currentWeatherCode,
        currentConditionZh: currentParsed.conditionZh,
        daily: dailyForecasts,
        pilgrimageTip: tip,
        updatedAt: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
      };

      weatherCache.set(cacheKey, { data: result, timestamp: Date.now() });
      return result;
    } catch (err) {
      console.warn('Open-Meteo fetch failed or offline, returning regional fallback estimate:', err);
      return this.getFallbackWeather(dest);
    }
  },

  generatePilgrimageTip(dest: DestinationLocation, today: DailyWeatherForecast): string {
    const isRainy = today.precipitationProbability > 40 || today.weatherCode >= 50;
    const isHot = today.tempMax >= 26;
    const isCool = today.tempMin <= 12;
    const isWindy = today.windSpeedMax >= 25;

    let advice = `${dest.terrainContext}。`;

    if (isRainy) {
      advice += ` 今日降雨機率約 ${today.precipitationProbability}%，參訪戶外大理石古蹟時地表較滑，務必穿著深紋防滑鞋並備隨身輕便雨衣。`;
    } else if (isHot) {
      advice += ` 白天最高氣溫約 ${today.tempMax}°C，希臘古蹟露天曝曬強烈，請隨身攜帶遮陽帽、太陽眼鏡並定時補水。`;
    } else {
      advice += ` 白天氣候舒適宜人（${today.tempMin}°C ~ ${today.tempMax}°C），極適合露天劇場默想與古蹟徒步巡禮。`;
    }

    if (isCool) {
      advice += ` 早晚溫差顯著，出發時建議採洋蔥式穿搭攜帶薄防風外套。`;
    }

    if (isWindy) {
      advice += ` 戶外風速達 ${today.windSpeedMax} km/h，在愛琴海岬角與高地時請注意站穩。`;
    }

    return advice;
  },

  getFallbackWeather(dest: DestinationLocation): DestinationWeatherData {
    const today = new Date();
    const dayLabels = ['今天 (Today)', '明天 (Tomorrow)', '後天 (Day 3)'];
    
    const daily: DailyWeatherForecast[] = [0, 1, 2].map((offset) => {
      const d = new Date(today.getTime() + offset * 86400000);
      return {
        date: d.toISOString().slice(0, 10),
        dayLabel: dayLabels[offset],
        weatherCode: offset === 1 ? 2 : 1,
        conditionZh: offset === 1 ? '晴間多雲' : '大致晴朗',
        conditionEn: offset === 1 ? 'Partly Cloudy' : 'Mainly Clear',
        tempMax: 23,
        tempMin: 14,
        precipitationProbability: 10,
        windSpeedMax: 14,
      };
    });

    return {
      locationNameZh: dest.cityZh,
      locationNameEn: dest.cityEn,
      latitude: dest.lat,
      longitude: dest.lng,
      currentTemp: 21,
      currentWeatherCode: 1,
      currentConditionZh: '大致晴朗',
      daily,
      pilgrimageTip: `${dest.terrainContext}。氣候宜人，造訪古蹟請備防滑健行鞋與充足飲用水。`,
      updatedAt: '預估資料 (離線備用)',
    };
  },
};
