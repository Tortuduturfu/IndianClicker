import { Guillaume } from '../types/game';

export const guillaumesData: Omit<Guillaume, 'currentPrice' | 'owned'>[] = [
  {
    id: 'g1',
    name: 'Ethan',
    emoji: '🤪',
    basePrice: 500,
    clicksPerSecond: 0.5,
  },
  {
    id: 'g2',
    name: 'Liam',
    emoji: '😜',
    basePrice: 2500,
    clicksPerSecond: 2,
  },
  {
    id: 'g3',
    name: 'Yael',
    emoji: '🥴',
    basePrice: 12000,
    clicksPerSecond: 8,
  },
  {
    id: 'g4',
    name: 'Mistinguett',
    emoji: '🤡',
    basePrice: 75000,
    clicksPerSecond: 30,
  },
];