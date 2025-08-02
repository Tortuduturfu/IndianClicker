import { Monster } from '../types/game';

export const monstersData: Omit<Monster, 'currentPrice' | 'obtained'>[] = [
  // Commun (20 variétés)
  { id: 'm1', name: 'Monster Original', rarity: 'commun', basePrice: 50, multiplier: 1.5, image: '🧪' },
  { id: 'm2', name: 'Monster Energy Green', rarity: 'commun', basePrice: 55, multiplier: 1.5, image: '💚' },
  { id: 'm3', name: 'Monster Blue', rarity: 'commun', basePrice: 60, multiplier: 1.5, image: '💙' },
  { id: 'm4', name: 'Monster Red', rarity: 'commun', basePrice: 65, multiplier: 1.5, image: '❤️' },
  { id: 'm5', name: 'Monster White', rarity: 'commun', basePrice: 70, multiplier: 1.5, image: '🤍' },
  { id: 'm6', name: 'Monster Yellow', rarity: 'commun', basePrice: 75, multiplier: 1.5, image: '💛' },
  { id: 'm7', name: 'Monster Orange', rarity: 'commun', basePrice: 80, multiplier: 1.5, image: '🧡' },
  { id: 'm8', name: 'Monster Purple', rarity: 'commun', basePrice: 85, multiplier: 1.5, image: '💜' },
  { id: 'm9', name: 'Monster Pink', rarity: 'commun', basePrice: 90, multiplier: 1.5, image: '💗' },
  { id: 'm10', name: 'Monster Black', rarity: 'commun', basePrice: 95, multiplier: 1.5, image: '🖤' },
  { id: 'm11', name: 'Monster Citrus', rarity: 'commun', basePrice: 100, multiplier: 1.5, image: '🍋' },
  { id: 'm12', name: 'Monster Berry', rarity: 'commun', basePrice: 105, multiplier: 1.5, image: '🫐' },
  { id: 'm13', name: 'Monster Apple', rarity: 'commun', basePrice: 110, multiplier: 1.5, image: '🍎' },
  { id: 'm14', name: 'Monster Grape', rarity: 'commun', basePrice: 115, multiplier: 1.5, image: '🍇' },
  { id: 'm15', name: 'Monster Peach', rarity: 'commun', basePrice: 120, multiplier: 1.5, image: '🍑' },
  { id: 'm16', name: 'Monster Mango', rarity: 'commun', basePrice: 125, multiplier: 1.5, image: '🥭' },
  { id: 'm17', name: 'Monster Tropical', rarity: 'commun', basePrice: 130, multiplier: 1.5, image: '🌺' },
  { id: 'm18', name: 'Monster Ice', rarity: 'commun', basePrice: 135, multiplier: 1.5, image: '❄️' },
  { id: 'm19', name: 'Monster Fire', rarity: 'commun', basePrice: 140, multiplier: 1.5, image: '🔥' },
  { id: 'm20', name: 'Monster Storm', rarity: 'commun', basePrice: 145, multiplier: 1.5, image: '⚡' },


  // Rare (15 variétés)
  { id: 'm21', name: 'Monster Ultra Blue', rarity: 'rare', basePrice: 300, multiplier: 2, image: '💎' },
  { id: 'm22', name: 'Monster Ultra Red', rarity: 'rare', basePrice: 350, multiplier: 2, image: '🔴' },
  { id: 'm23', name: 'Monster Ultra White', rarity: 'rare', basePrice: 400, multiplier: 2, image: '⚪' },
  { id: 'm24', name: 'Monster Ultra Black', rarity: 'rare', basePrice: 450, multiplier: 2, image: '⚫' },
  { id: 'm25', name: 'Monster Ultra Violet', rarity: 'rare', basePrice: 500, multiplier: 2, image: '🟣' },
  { id: 'm26', name: 'Monster Rehab', rarity: 'rare', basePrice: 550, multiplier: 2, image: '🏥' },
  { id: 'm27', name: 'Monster Java', rarity: 'rare', basePrice: 600, multiplier: 2, image: '☕' },
  { id: 'm28', name: 'Monster Punch', rarity: 'rare', basePrice: 650, multiplier: 2, image: '👊' },
  { id: 'm29', name: 'Monster Juice', rarity: 'rare', basePrice: 700, multiplier: 2, image: '🧃' },
  { id: 'm30', name: 'Monster Hydro', rarity: 'rare', basePrice: 750, multiplier: 2, image: '💧' },
  { id: 'm31', name: 'Monster Zero', rarity: 'rare', basePrice: 800, multiplier: 2, image: '0️⃣' },
  { id: 'm32', name: 'Monster Import', rarity: 'rare', basePrice: 850, multiplier: 2, image: '📦' },
  { id: 'm33', name: 'Monster Assault', rarity: 'rare', basePrice: 900, multiplier: 2, image: '🎯' },
  { id: 'm34', name: 'Monster Chaos', rarity: 'rare', basePrice: 950, multiplier: 2, image: '🌪️' },
  { id: 'm35', name: 'Monster Ripper', rarity: 'rare', basePrice: 1000, multiplier: 2, image: '⚔️' },

  // Épique (10 variétés)
  { id: 'm36', name: 'Monster Dragon', rarity: 'épique', basePrice: 2000, multiplier: 3, image: '🐉' },
  { id: 'm37', name: 'Monster Phoenix', rarity: 'épique', basePrice: 2500, multiplier: 3, image: '🔥' },
  { id: 'm38', name: 'Monster Lightning', rarity: 'épique', basePrice: 3000, multiplier: 3, image: '⚡' },
  { id: 'm39', name: 'Monster Frost', rarity: 'épique', basePrice: 3500, multiplier: 3, image: '🧊' },
  { id: 'm40', name: 'Monster Shadow', rarity: 'épique', basePrice: 4000, multiplier: 3, image: '🌑' },
  { id: 'm41', name: 'Monster Gold', rarity: 'épique', basePrice: 4500, multiplier: 3, image: '🏆' },
  { id: 'm42', name: 'Monster Crystal', rarity: 'épique', basePrice: 5000, multiplier: 3, image: '💎' },
  { id: 'm43', name: 'Monster Plasma', rarity: 'épique', basePrice: 5500, multiplier: 3, image: '🌌' },
  { id: 'm44', name: 'Monster Quantum', rarity: 'épique', basePrice: 6000, multiplier: 3, image: '⚛️' },
  { id: 'm45', name: 'Monster Nebula', rarity: 'épique', basePrice: 6500, multiplier: 3, image: '🌠' },

  // Monstrueux (5 variétés)
  { id: 'm46', name: 'Monster Kraken', rarity: 'monstrueux', basePrice: 15000, multiplier: 5, image: '🐙' },
  { id: 'm47', name: 'Monster Leviathan', rarity: 'monstrueux', basePrice: 20000, multiplier: 5, image: '🐋' },
  { id: 'm48', name: 'Monster Behemoth', rarity: 'monstrueux', basePrice: 25000, multiplier: 5, image: '🦣' },
  { id: 'm49', name: 'Monster Titan', rarity: 'monstrueux', basePrice: 30000, multiplier: 5, image: '🗿' },
  { id: 'm50', name: 'Monster Omega', rarity: 'monstrueux', basePrice: 50000, multiplier: 8, image: '♾️' },
];