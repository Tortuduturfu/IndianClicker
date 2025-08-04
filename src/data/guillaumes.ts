import { Guillaume } from '../types/game';

export const guillaumesData: Omit<Guillaume, 'currentPrice' | 'owned'>[] = [
  {
    id: 'g1',
    name: 'Ethan',
    emoji: '🤪',
    basePrice: 1000,
    clicksPerSecond: 0.5,
  },
  {
    id: 'g2',
    name: 'Liam',
    emoji: '😜',
    basePrice: 5000,
    clicksPerSecond: 2,
  },
  {
    id: 'g3',
    name: 'Yael',
    emoji: '🥴',
    basePrice: 25000,
    clicksPerSecond: 8,
  },
  {
    id: 'g4',
    name: 'Mistinguett',
    emoji: '🤡',
    basePrice: 150000,
    clicksPerSecond: 30,
  },
];