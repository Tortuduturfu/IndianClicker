import { Monster } from '../types/game';
import { monstersData } from '../data/monsters';

// Probabilités d'obtenir chaque rareté
const RARITY_CHANCES = {
  commun: 0.60,     // 60%
  rare: 0.25,       // 25%
  épique: 0.12,     // 12%
  monstrueux: 0.03  // 3%
};

// Configuration du prix progressif
const PRICE_CONFIG = {
  basePrice: 500,           // Prix de base d'un ticket
  priceIncrease: 50,        // Augmentation par achat
  maxPriceMultiplier: 5     // Prix maximum = basePrice * maxPriceMultiplier
};

export function generateRandomMonster(): Monster {
  const random = Math.random();
  let rarity: 'commun' | 'rare' | 'épique' | 'monstrueux';
     
  if (random < RARITY_CHANCES.monstrueux) {
    rarity = 'monstrueux';
  } else if (random < RARITY_CHANCES.monstrueux + RARITY_CHANCES.épique) {
    rarity = 'épique';
  } else if (random < RARITY_CHANCES.monstrueux + RARITY_CHANCES.épique + RARITY_CHANCES.rare) {
    rarity = 'rare';
  } else {
    rarity = 'commun';
  }
     
  // Sélectionner un monster aléatoire de cette rareté
  const monstersOfRarity = monstersData.filter(m => m.rarity === rarity);
  const randomMonster = monstersOfRarity[Math.floor(Math.random() * monstersOfRarity.length)];
     
  return {
    ...randomMonster,
    currentPrice: randomMonster.basePrice,
    obtained: 0
  };
}

// Fonction principale pour calculer le prix actuel d'un ticket
export function calculateTicketPrice(totalPurchases: number): number {
  const increasedPrice = PRICE_CONFIG.basePrice + (totalPurchases * PRICE_CONFIG.priceIncrease);
  const maxPrice = PRICE_CONFIG.basePrice * PRICE_CONFIG.maxPriceMultiplier;
  
  return Math.min(increasedPrice, maxPrice);
}

// Fonction pour obtenir le prix du prochain ticket
export function getNextTicketPrice(totalPurchases: number): number {
  return calculateTicketPrice(totalPurchases + 1);
}

// Fonction pour obtenir des informations complètes sur l'évolution des prix
export function getPriceInfo(totalPurchases: number) {
  const currentPrice = calculateTicketPrice(totalPurchases);
  const nextPrice = calculateTicketPrice(totalPurchases + 1);
  const maxPrice = PRICE_CONFIG.basePrice * PRICE_CONFIG.maxPriceMultiplier;
  const isMaxPrice = currentPrice >= maxPrice;
  
  return {
    currentPrice,
    nextPrice: isMaxPrice ? maxPrice : nextPrice,
    priceIncrease: isMaxPrice ? 0 : PRICE_CONFIG.priceIncrease,
    isMaxPrice,
    totalPurchases,
    basePrice: PRICE_CONFIG.basePrice,
    maxPrice
  };
}

// Fonction utilitaire pour réinitialiser les prix (pour tests ou reset du jeu)
export function resetPricing() {
  return {
    totalPurchases: 0,
    currentPrice: PRICE_CONFIG.basePrice
  };
}

// Prix de base pour référence (NE PLUS UTILISER DIRECTEMENT POUR LES ACHATS)
export const TICKET_BASE_PRICE = PRICE_CONFIG.basePrice;

// Fonction pour sauvegarder/charger le nombre d'achats (pour localStorage)
export function savePurchasesToStorage(totalPurchases: number): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('totalMonsterPurchases', totalPurchases.toString());
  }
}

export function loadPurchasesFromStorage(): number {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('totalMonsterPurchases');
    return saved ? parseInt(saved, 10) : 0;
  }
  return 0;
}

// Casino utilities (inchangé)
interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  value: number;
  display: string;
}

export function createDeck(): Card[] {
  const suits: Card['suit'][] = ['hearts', 'diamonds', 'clubs', 'spades'];
  const deck: Card[] = [];
     
  for (const suit of suits) {
    for (let value = 1; value <= 13; value++) {
      let display = '';
      if (value === 1) display = 'A';
      else if (value === 11) display = 'J';
      else if (value === 12) display = 'Q';
      else if (value === 13) display = 'K';
      else display = value.toString();
             
      deck.push({ suit, value, display });
    }
  }
     
  return shuffleDeck(deck);
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getCardValue(card: Card, aceAsEleven: boolean = true): number {
  if (card.value === 1) return aceAsEleven ? 11 : 1;
  if (card.value > 10) return 10;
  return card.value;
}

export function calculateHandValue(cards: Card[]): { value: number; isBlackjack: boolean; isBust: boolean } {
  let value = 0;
  let aces = 0;
     
  for (const card of cards) {
    if (card.value === 1) {
      aces++;
      value += 11;
    } else if (card.value > 10) {
      value += 10;
    } else {
      value += card.value;
    }
  }
     
  // Adjust for aces
  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }
     
  const isBlackjack = cards.length === 2 && value === 21;
  const isBust = value > 21;
     
  return { value, isBlackjack, isBust };
}

export function getSuitSymbol(suit: Card['suit']): string {
  switch (suit) {
    case 'hearts': return '♥️';
    case 'diamonds': return '♦️';
    case 'clubs': return '♣️';
    case 'spades': return '♠️';
  }
}