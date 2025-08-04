export type Tab = 'travail' | 'casino' | 'station-service' | 'collection' | 'achievements' | 'settings';

export type Theme = 'dark' | 'light' | 'neon' | 'forest' | 'ocean' | 'sunset' | 'cyberpunk' | 'retro';

export interface Settings {
  theme: Theme;
  soundVolume: number;
}

export interface Monster {
  id: string;
  name: string;
  rarity: 'commun' | 'rare' | 'épique' | 'monstrueux';
  basePrice: number;
  currentPrice: number;
  multiplier: number;
  image: string;
  obtained: number;
}

export interface Guillaume {
  id: string;
  name: string;
  emoji: string;
  basePrice: number;
  currentPrice: number;
  clicksPerSecond: number;
  owned: number;
}

export interface GameState {
  rupees: number;
  totalClicks: number;
  clickPower: number;
  maxClickPower?: number;
  guillaumes: Guillaume[];
  monstersCollection: Monster[];
  currentBuilding: number;
  scratchTickets: number;
  achievements: Achievement[];
  totalMoneyEarned: number;
  totalTicketsScratched: number;
  totalCasinoWins: number;
  totalCasinoLosses: number;
  totalCasinoBet: number;
  biggestWin: number;
  blackjackWins: number;
  rouletteWins: number;
  slotWins: number;
  settings: Settings;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  isHidden: boolean;
  isUnlocked: boolean;
  condition: (gameState: GameState) => boolean;
  reward?: number;
}

export interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  value: number;
  display: string;
}

export interface BlackjackHand {
  cards: Card[];
  value: number;
  isBlackjack: boolean;
  isBust: boolean;
}