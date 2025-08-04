import { Monster } from '../types/game';

export const monstersData: Omit<Monster, 'currentPrice' | 'obtained'>[] = [
  // Commun (20 variétés)
  { id: 'm1', name: 'Monster Original', rarity: 'commun', basePrice: 100, multiplier: 1.5, image: '🧪' },
  { id: 'm2', name: 'Monster Energy Green', rarity: 'commun', basePrice: 150, multiplier: 1.5, image: '💚' },
  { id: 'm3', name: 'Monster Blue', rarity: 'commun', basePrice: 200, multiplier: 1.5, image: '💙' },
  { id: 'm4', name: 'Monster Red', rarity: 'commun', basePrice: 250, multiplier: 1.5, image: '❤️' },
  { id: 'm5', name: 'Monster White', rarity: 'commun', basePrice: 300, multiplier: 1.5, image: '🤍' },
  { id: 'm6', name: 'Monster Yellow', rarity: 'commun', basePrice: 350, multiplier: 1.5, image: '💛' },
  { id: 'm7', name: 'Monster Orange', rarity: 'commun', basePrice: 400, multiplier: 1.5, image: '🧡' },
  { id: 'm8', name: 'Monster Purple', rarity: 'commun', basePrice: 450, multiplier: 1.5, image: '💜' },
  { id: 'm9', name: 'Monster Pink', rarity: 'commun', basePrice: 500, multiplier: 1.5, image: '💗' },
  { id: 'm10', name: 'Monster Black', rarity: 'commun', basePrice: 550, multiplier: 1.5, image: '🖤' },
  { id: 'm11', name: 'Monster Citrus', rarity: 'commun', basePrice: 600, multiplier: 1.5, image: '🍋' },
  { id: 'm12', name: 'Monster Berry', rarity: 'commun', basePrice: 650, multiplier: 1.5, image: '🫐' },
  { id: 'm13', name: 'Monster Apple', rarity: 'commun', basePrice: 700, multiplier: 1.5, image: '🍎' },
  { id: 'm14', name: 'Monster Grape', rarity: 'commun', basePrice: 750, multiplier: 1.5, image: '🍇' },
  { id: 'm15', name: 'Monster Peach', rarity: 'commun', basePrice: 800, multiplier: 1.5, image: '🍑' },
  { id: 'm16', name: 'Monster Mango', rarity: 'commun', basePrice: 850, multiplier: 1.5, image: '🥭' },
  { id: 'm17', name: 'Monster Tropical', rarity: 'commun', basePrice: 900, multiplier: 1.5, image: '🌺' },
  { id: 'm18', name: 'Monster Ice', rarity: 'commun', basePrice: 950, multiplier: 1.5, image: '❄️' },
  { id: 'm19', name: 'Monster Fire', rarity: 'commun', basePrice: 1000, multiplier: 1.5, image: '🔥' },
  { id: 'm20', name: 'Monster Storm', rarity: 'commun', basePrice: 1100, multiplier: 1.5, image: '⚡' },


  // Rare (15 variétés)
  { id: 'm21', name: 'Monster Ultra Blue', rarity: 'rare', basePrice: 1500, multiplier: 2, image: '💎' },
  { id: 'm22', name: 'Monster Ultra Red', rarity: 'rare', basePrice: 1800, multiplier: 2, image: '🔴' },
  { id: 'm23', name: 'Monster Ultra White', rarity: 'rare', basePrice: 2100, multiplier: 2, image: '⚪' },
  { id: 'm24', name: 'Monster Ultra Black', rarity: 'rare', basePrice: 2400, multiplier: 2, image: '⚫' },
  { id: 'm25', name: 'Monster Ultra Violet', rarity: 'rare', basePrice: 2700, multiplier: 2, image: '🟣' },
  { id: 'm26', name: 'Monster Rehab', rarity: 'rare', basePrice: 3000, multiplier: 2, image: '🏥' },
  { id: 'm27', name: 'Monster Java', rarity: 'rare', basePrice: 3300, multiplier: 2, image: '☕' },
  { id: 'm28', name: 'Monster Punch', rarity: 'rare', basePrice: 3600, multiplier: 2, image: '👊' },
  { id: 'm29', name: 'Monster Juice', rarity: 'rare', basePrice: 3900, multiplier: 2, image: '🧃' },
  { id: 'm30', name: 'Monster Hydro', rarity: 'rare', basePrice: 4200, multiplier: 2, image: '💧' },
  { id: 'm31', name: 'Monster Zero', rarity: 'rare', basePrice: 4500, multiplier: 2, image: '0️⃣' },
  { id: 'm32', name: 'Monster Import', rarity: 'rare', basePrice: 4800, multiplier: 2, image: '📦' },
  { id: 'm33', name: 'Monster Assault', rarity: 'rare', basePrice: 5100, multiplier: 2, image: '🎯' },
  { id: 'm34', name: 'Monster Chaos', rarity: 'rare', basePrice: 5400, multiplier: 2, image: '🌪️' },
  { id: 'm35', name: 'Monster Ripper', rarity: 'rare', basePrice: 5700, multiplier: 2, image: '⚔️' },

  // Épique (10 variétés)
  { id: 'm36', name: 'Monster Dragon', rarity: 'épique', basePrice: 10000, multiplier: 3, image: '🐉' },
  { id: 'm37', name: 'Monster Phoenix', rarity: 'épique', basePrice: 12500, multiplier: 3, image: '🔥' },
  { id: 'm38', name: 'Monster Lightning', rarity: 'épique', basePrice: 15000, multiplier: 3, image: '⚡' },
  { id: 'm39', name: 'Monster Frost', rarity: 'épique', basePrice: 17500, multiplier: 3, image: '🧊' },
  { id: 'm40', name: 'Monster Shadow', rarity: 'épique', basePrice: 20000, multiplier: 3, image: '🌑' },
  { id: 'm41', name: 'Monster Gold', rarity: 'épique', basePrice: 22500, multiplier: 3, image: '🏆' },
  { id: 'm42', name: 'Monster Crystal', rarity: 'épique', basePrice: 25000, multiplier: 3, image: '💎' },
  { id: 'm43', name: 'Monster Plasma', rarity: 'épique', basePrice: 27500, multiplier: 3, image: '🌌' },
  { id: 'm44', name: 'Monster Quantum', rarity: 'épique', basePrice: 30000, multiplier: 3, image: '⚛️' },
  { id: 'm45', name: 'Monster Nebula', rarity: 'épique', basePrice: 32500, multiplier: 3, image: '🌠' },

  // Monstrueux (5 variétés)
  { id: 'm46', name: 'Monster Kraken', rarity: 'monstrueux', basePrice: 75000, multiplier: 5, image: '🐙' },
  { id: 'm47', name: 'Monster Leviathan', rarity: 'monstrueux', basePrice: 100000, multiplier: 5, image: '🐋' },
  { id: 'm48', name: 'Monster Behemoth', rarity: 'monstrueux', basePrice: 125000, multiplier: 5, image: '🦣' },
  { id: 'm49', name: 'Monster Titan', rarity: 'monstrueux', basePrice: 150000, multiplier: 5, image: '🗿' },
  { id: 'm50', name: 'Monster Omega', rarity: 'monstrueux', basePrice: 250000, multiplier: 8, image: '♾️' },
];