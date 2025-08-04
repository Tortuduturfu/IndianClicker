// Types pour les thèmes
export type Theme = 
  | 'dark' 
  | 'light' 
  | 'neon' 
  | 'forest' 
  | 'ocean' 
  | 'sunset' 
  | 'cyberpunk' 
  | 'retro';

// Interface pour les paramètres du jeu
export interface GameSettings {
  theme: Theme;
  soundVolume: number; // 0-100
  musicVolume?: number; // 0-100 (optionnel pour l'instant)
}

// Interface pour les cartes (casino)
export interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  value: number; // 1-13 (1 = As, 11 = Valet, 12 = Dame, 13 = Roi)
  display: string; // 'A', '2', '3', ..., 'J', 'Q', 'K'
}

// Interface pour les mains de blackjack
export interface BlackjackHand {
  cards: Card[];
  value: number;
  isBlackjack: boolean;
  isBust: boolean;
}

// Interface pour les monstres
export interface Monster {
  id: string;
  name: string;
  rarity: 'commun' | 'rare' | 'épique' | 'monstrueux';
  basePrice: number;
  currentPrice: number;
  multiplier: number;
  obtained: number;
  image: string;
}

// Interface pour les Guillaume
export interface Guillaume {
  id: string;
  name: string;
  emoji: string;
  basePrice: number;
  currentPrice: number;
  clicksPerSecond: number;
  owned: number;
}

// Interface pour les achievements
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  isHidden: boolean;
  condition: (state: GameState) => boolean;
  reward?: number;
}

// Types pour les onglets
export type Tab = 'travail' | 'casino' | 'station-service' | 'collection' | 'achievements';

// Interface principale pour l'état du jeu
export interface GameState {
  // Ressources
  rupees: number;
  totalClicks: number;
  clickPower: number;
  maxClickPower: number;
  
  // Collections
  guillaumes: Guillaume[];
  monstersCollection: Monster[];
  achievements: Achievement[];
  
  // Progression
  currentBuilding: number;
  scratchTickets: number;
  
  // Statistiques
  totalMoneyEarned: number;
  totalTicketsScratched: number;
  totalCasinoWins: number;
  totalCasinoLosses: number;
  totalCasinoBet?: number;
  biggestWin?: number;
  
  // Statistiques spécifiques aux jeux de casino
  blackjackWins?: number;
  rouletteWins?: number;
  slotWins?: number;
  
  // Paramètres
  settings: GameSettings;
}