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
}

// Interface pour les monstres
export interface Monster {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  obtained: number;
  maxObtainable?: number;
  description?: string;
  image?: string;
}

// Interface pour les Guillaume
export interface Guillaume {
  id: string;
  name: string;
  cost: number;
  owned: number;
  baseIncome: number;
  description?: string;
  upgradeMultiplier?: number;
}

// Interface pour les achievements
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  reward?: {
    type: 'rupees' | 'multiplier' | 'unlock';
    value: number;
  };
}

// Interface principale pour l'état du jeu
export interface GameState {
  // Ressources
  rupees: number;
  
  // Paramètres
  settings: GameSettings;
  
  // Statistiques
  totalClicks: number;
  totalMoneyEarned: number;
  totalTicketsScratched: number;
  totalCasinoWins: number;
  
  // Collections
  monstersCollection: Monster[];
  guillaumes: Guillaume[];
  achievements: Achievement[];
  
  // Progression
  clickPower: number;
  passiveIncome: number;
  
  // État des mini-jeux
  casinoStats?: {
    blackjackWins: number;
    rouletteWins: number;
    slotMachineWins: number;
    totalBet: number;
    biggestWin: number;
  };
  
  // Dernière sauvegarde
  lastSave?: number;
  
  // Version pour la compatibilité des sauvegardes
  version?: string;
}