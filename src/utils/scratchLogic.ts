import { Monster } from '../types/game';
import { monstersData } from '../data/monsters';

// Probabilités d'obtenir chaque rareté
const RARITY_CHANCES = {
  commun: 0.60,     // 60%
  rare: 0.25,       // 25%
  épique: 0.12,     // 12%
  monstrueux: 0.03  // 3%
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

export const TICKET_PRICE = 500; // Prix d'un ticket à gratter

// Casino utilities
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