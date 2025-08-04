export type Tab = 'travail' | 'casino' | 'station-service' | 'collection' | 'achievements';

export type Theme = 'dark' | 'light' | 'neon';

export interface Settings {
  theme: Theme;
  soundVolume: number;
  musicVolume: number;
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
  guillaumes: Guillaume[];
  monstersCollection: Monster[];
  currentBuilding: number; // 0: carton, 1-5: évolution vers villa
  scratchTickets: number; // Nombre de tickets à gratter possédés
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
  maxClickPower: number;
}


export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  isHidden: boolean;
  isUnlocked: boolean;
  condition: (gameState: GameState) => boolean;
  reward?: number; // Bonus rupees when unlocked
}

export interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  value: number; // 1-13 (1=Ace, 11=Jack, 12=Queen, 13=King)
  display: string;
}

export interface BlackjackHand {
  cards: Card[];
  value: number;
  isBlackjack: boolean;
  isBust: boolean;
}