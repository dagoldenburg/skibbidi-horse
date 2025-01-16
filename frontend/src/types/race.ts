export interface Race {
  id: number;
  name: string;
  date: string;
  time: string;
  type: 'V75' | 'V86';
  confidence: number;
  races: number;
  prize: string;
  track: string;
}

export interface Analytics {
  speedRating: string;
  strengthRating: string;
  startSpeedRating: string;
  trackFitRating: string;
  distanceFitRating: string;
  recentFormRating: string;
}

export interface Horse {
  number: number;
  name: string;
  driver: string;
  trainer: string;
  confidence: string;
  odds: string;
  startPosition: number;
  recentForm: string[];
  winPercentage: string;
  earnings: string;
  totalStarts: number;
  yearStats: {
    starts: number;
    wins: number;
    seconds: number;
    thirds: number;
  };
  analytics: Analytics;
  horseInsights: string[];
  driverInsights: string[];
}

export interface RaceDetails {
  raceNumber: number;
  distance: string;
  startMethod: string;
  prize: string;
  trackCondition: string;
  weather: string;
  temperature: string;
  aiAnalysis: string;
  topPicks: {
    favorites: Horse[];
    longshot: Horse;
  };
}

export interface DetailedRace {
  id: string;
  name: string;
  date: string;
  time: string;
  track: string;
  type: 'V75' | 'V86';
  races: {
    details: RaceDetails;
    horses: Horse[];
  }[];
  overallAnalysis: string;
  weatherImpact: string;
  trackAnalysis: string;
  valuePlay: string;
}

export interface PreviousRace {
  id: number;
  event: string;
  track: string;
  date: string;
  totalWinnings: string;
  races: {
    number: number;
    winner: number;
    picks: number[];
    label?: string;
    distance: string;
    class: string;
    winningTime: string;
    odds: string;
    analytics: {
      paceRating: string;
      trackCondition: string;
      winningMargin: string;
    };
  }[];
  payouts: {
    correct: number;
    amount: string;
    count: number;
    total: string;
  }[];
  statistics: {
    averageOdds: number;
    favoriteWins: number;
    longshots: number;
    averageWinningMargin: string;
    totalPrizePool: string;
  };
} 