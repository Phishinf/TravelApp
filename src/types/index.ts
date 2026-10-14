export type TabType = 
  | 'itinerary' 
  | 'sights' 
  | 'paul-journey' 
  | 'history' 
  | 'fathers-martyrs' 
  | 'sacred-art' 
  | 'church-architecture' 
  | 'hymns' 
  | 'journal';

export interface ScheduleEvent {
  id: string;
  time: string;
  title: string;
  titleZh: string;
  location: string;
  locationZh: string;
  description: string;
  descriptionZh: string;
  scripture?: {
    reference: string;
    text: string;
  };
  highlight?: string;
  category: 'worship' | 'sight' | 'travel' | 'meal' | 'reflection';
  completed?: boolean;
}

export interface DayItinerary {
  dayNumber: number;
  dateStr: string;
  title: string;
  titleZh: string;
  region: string;
  regionZh: string;
  themeVerse: {
    ref: string;
    text: string;
  };
  overview: string;
  overviewZh: string;
  keySpots: string[];
  travelDistanceKm: number;
  overnightLocation: string;
  destinationCoords?: {
    lat: number;
    lng: number;
    cityZh: string;
    cityEn: string;
  };
  events: ScheduleEvent[];
  devotionalPrompt: string;
  heroImage?: {
    url: string;
    sourceUrl: string;
    credit: string;
    caption: string;
  };
}

export interface DailyWeatherForecast {
  date: string;
  dayLabel: string;
  weatherCode: number;
  conditionZh: string;
  conditionEn: string;
  tempMax: number;
  tempMin: number;
  precipitationProbability: number;
  windSpeedMax: number;
}

export interface DestinationWeatherData {
  locationNameZh: string;
  locationNameEn: string;
  latitude: number;
  longitude: number;
  currentTemp?: number;
  currentWeatherCode?: number;
  currentConditionZh?: string;
  daily: DailyWeatherForecast[];
  pilgrimageTip: string;
  updatedAt: string;
}

export interface SightTimelineEvent {
  period: string;
  title: string;
  description: string;
}

export interface Sight {
  id: string;
  nameEn: string;
  nameZh: string;
  ancientName?: string;
  region: string;
  scriptureRef: string;
  scriptureText: string;
  summary: string;
  historicalContext: string;
  timeline: SightTimelineEvent[];
  mustSeeSpots: {
    name: string;
    description: string;
    biblicalSignificance?: string;
  }[];
  imageUrl: string;
  imageCaption?: string;
  imageCredit?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  tags: string[];
}

export interface PaulJourneyStage {
  id: string;
  journeyNumber: number | 'rome';
  journeyName: string;
  journeyNameZh: string;
  years: string;
  companions: string[];
  keyPassages: string[];
  route: string[];
  /** Map points for each route stop, index-aligned with `route` ([lat, lng]); empty when the stop isn't a single place. */
  routeCoords?: [number, number][][];
  summaryZh: string;
  historicalImpact: string;
  associatedEpistles: string[];
}

export interface HistoricalTopic {
  id: string;
  category: 'greek-culture' | 'polis' | 'hellenistic' | 'roman-emperors' | 'cuisine';
  titleEn: string;
  titleZh: string;
  period: string;
  leadSummary: string;
  details: {
    subtitle: string;
    content: string;
  }[];
  keyFigures?: string[];
  scripturalConnection?: string;
  imageUrl?: string;
  imageCaption?: string;
  gallery?: TopicGalleryItem[];
}

export interface Recipe {
  servings: string;
  time: string;
  ingredients: string[];
  steps: string[];
  tip?: string;
}

export interface TopicGalleryItem {
  imageUrl: string;
  sourceUrl: string;
  credit: string;
  titleZh: string;
  titleEn: string;
  caption: string;
  recipe?: Recipe;
}

export interface FatherMartyr {
  id: string;
  type: 'apostolic-father' | 'martyr' | 'ante-nicene';
  nameEn: string;
  nameZh: string;
  years: string;
  role: string;
  historicalSignificance: string;
  keyWorksOrConfession: string;
  quotesOrEvents: string[];
  imageUrl?: string;
  memorialSites?: MemorialSite[];
}

export interface MemorialSite {
  name: string;
  location: string;
  connection: string;
  imageUrl: string;
  sourceUrl: string;
  credit: string;
}

export interface SacredArtConcept {
  id: string;
  titleEn: string;
  titleZh: string;
  historicalPeriod: string;
  leadSummary: string;
  keyPoints: {
    heading: string;
    body: string;
  }[];
  historicalCouncils?: string[];
  symbolisms: {
    symbol: string;
    meaning: string;
  }[];
  imageUrl?: string;
  caption?: string;
  gallery?: IconGalleryItem[];
}

export interface IconGalleryItem {
  imageUrl: string;
  sourceUrl: string;
  titleZh: string;
  titleEn: string;
  era: string;
  location: string;
  story: string;
}

export interface ChurchArchitectureStyle {
  id: string;
  nameZh: string;
  nameEn: string;
  period: string;
  description: string;
  features: string[];
  examples: string[];
  imageUrl?: string;
  imageCaption?: string;
  imageCredit?: string;
  imageSourceUrl?: string;
}

export interface ChurchBuildingPart {
  nameZh: string;
  nameEn: string;
  description: string;
}

export interface FeaturedChurch {
  id: string;
  nameZh: string;
  nameEn: string;
  cityZh: string;
  period: string;
  styleZh: string;
  description: string;
  highlights: string[];
  imageUrl?: string;
  imageCredit?: string;
  imageSourceUrl?: string;
}

export interface Hymn {
  id: number;
  titleZh: string;
  titleEn?: string;
  scriptureFoundation: string;
  lyrics: string[];
  theme: string;
  musicKey?: string;
  tempoBpm?: number;
  melodyNotes?: { note: string; dur: number }[];
}

export interface JournalEntry {
  id: string;
  date: string;
  dayNumber?: number;
  location: string;
  title: string;
  content: string;
  prayer: string;
  verseRef?: string;
  tags: string[];
  createdAt: number;
}
