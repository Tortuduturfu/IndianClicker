import { Achievement } from '../types/game';

export const achievementsData: Omit<Achievement, 'isUnlocked'>[] = [
  // Visible Achievements (25)
  {
    id: 'first_click',
    name: 'Premier Clic',
    description: 'Effectuer votre premier clic',
    icon: '👆',
    isHidden: false,
    condition: (state) => state.totalClicks >= 1,
    reward: 10
  },
  {
    id: 'hundred_clicks',
    name: 'Centurion',
    description: 'Effectuer 100 clics',
    icon: '💯',
    isHidden: false,
    condition: (state) => state.totalClicks >= 100,
    reward: 50
  },
  {
    id: 'thousand_clicks',
    name: 'Millier',
    description: 'Effectuer 1000 clics',
    icon: '🔥',
    isHidden: false,
    condition: (state) => state.totalClicks >= 1000,
    reward: 200
  },
  {
    id: 'first_rupee',
    name: 'Première Roupie',
    description: 'Gagner votre première roupie',
    icon: '💰',
    isHidden: false,
    condition: (state) => state.totalMoneyEarned >= 1,
    reward: 5
  },
  {
    id: 'rich_man',
    name: 'Homme Riche',
    description: 'Posséder 10,000 roupies',
    icon: '🤑',
    isHidden: false,
    condition: (state) => state.rupees >= 10000,
    reward: 1000
  },
  {
    id: 'millionaire',
    name: 'Millionnaire',
    description: 'Posséder 1,000,000 roupies',
    icon: '💎',
    isHidden: false,
    condition: (state) => state.rupees >= 1000000,
    reward: 50000
  },
  {
    id: 'first_guillaume',
    name: 'Premier Esclave',
    description: 'Acheter votre premier Guillaume',
    icon: '👨‍💼',
    isHidden: false,
    condition: (state) => state.guillaumes.some(g => g.owned > 0),
    reward: 100
  },
  {
    id: 'guillaume_army',
    name: 'Armée de Guillaume',
    description: 'Posséder 10 Guillaume au total',
    icon: '👥',
    isHidden: false,
    condition: (state) => state.guillaumes.reduce((sum, g) => sum + g.owned, 0) >= 10,
    reward: 500
  },
  {
    id: 'first_ticket',
    name: 'Premier Ticket',
    description: 'Acheter votre premier ticket à gratter',
    icon: '🎫',
    isHidden: false,
    condition: (state) => state.totalTicketsScratched >= 1,
    reward: 50
  },
  {
    id: 'ticket_addict',
    name: 'Accro aux Tickets',
    description: 'Gratter 50 tickets',
    icon: '🎰',
    isHidden: false,
    condition: (state) => state.totalTicketsScratched >= 50,
    reward: 1000
  },
  {
    id: 'first_monster',
    name: 'Première Monster',
    description: 'Obtenir votre première Monster Energy',
    icon: '🧪',
    isHidden: false,
    condition: (state) => state.monstersCollection.some(m => m.obtained > 0),
    reward: 100
  },
  {
    id: 'monster_collector',
    name: 'Collectionneur',
    description: 'Obtenir 10 Monster différentes',
    icon: '📚',
    isHidden: false,
    condition: (state) => state.monstersCollection.filter(m => m.obtained > 0).length >= 10,
    reward: 500
  },
  {
    id: 'rare_hunter',
    name: 'Chasseur de Rares',
    description: 'Obtenir une Monster rare',
    icon: '🔵',
    isHidden: false,
    condition: (state) => state.monstersCollection.some(m => m.rarity === 'rare' && m.obtained > 0),
    reward: 200
  },
  {
    id: 'epic_finder',
    name: 'Découvreur Épique',
    description: 'Obtenir une Monster épique',
    icon: '🟣',
    isHidden: false,
    condition: (state) => state.monstersCollection.some(m => m.rarity === 'épique' && m.obtained > 0),
    reward: 1000
  },
  {
    id: 'legendary_master',
    name: 'Maître Légendaire',
    description: 'Obtenir une Monster monstrueuse',
    icon: '🔴',
    isHidden: false,
    condition: (state) => state.monstersCollection.some(m => m.rarity === 'monstrueux' && m.obtained > 0),
    reward: 5000
  },
  {
    id: 'casino_winner',
    name: 'Gagnant du Casino',
    description: 'Gagner 10 parties au casino',
    icon: '🎉',
    isHidden: false,
    condition: (state) => state.totalCasinoWins >= 10,
    reward: 500
  },
  {
    id: 'high_roller',
    name: 'Gros Joueur',
    description: 'Gagner 100 parties au casino',
    icon: '🎲',
    isHidden: false,
    condition: (state) => state.totalCasinoWins >= 100,
    reward: 2000
  },
  {
    id: 'power_clicker',
    name: 'Cliqueur Puissant',
    description: 'Atteindre x10 de puissance de clic',
    icon: '⚡',
    isHidden: false,
    condition: (state) => state.maxClickPower >= 10,
    reward: 300
  },
  {
    id: 'super_clicker',
    name: 'Super Cliqueur',
    description: 'Atteindre x100 de puissance de clic',
    icon: '🚀',
    isHidden: false,
    condition: (state) => state.maxClickPower >= 100,
    reward: 2000
  },
  {
    id: 'homeless_to_rich',
    name: 'Du Carton à la Villa',
    description: 'Passer du carton à la villa',
    icon: '🏰',
    isHidden: false,
    condition: (state) => state.currentBuilding >= 5,
    reward: 10000
  },
  {
    id: 'speed_demon',
    name: 'Démon de la Vitesse',
    description: 'Avoir 100 clics/sec automatiques',
    icon: '💨',
    isHidden: false,
    condition: (state) => state.guillaumes.reduce((sum, g) => sum + g.clicksPerSecond * g.owned, 0) >= 100,
    reward: 5000
  },
  {
    id: 'complete_common',
    name: 'Collection Commune',
    description: 'Obtenir toutes les Monster communes',
    icon: '⚪',
    isHidden: false,
    condition: (state) => {
      const commonMonsters = state.monstersCollection.filter(m => m.rarity === 'commun');
      return commonMonsters.every(m => m.obtained > 0);
    },
    reward: 2000
  },
  {
    id: 'complete_rare',
    name: 'Collection Rare',
    description: 'Obtenir toutes les Monster rares',
    icon: '🔵',
    isHidden: false,
    condition: (state) => {
      const rareMonsters = state.monstersCollection.filter(m => m.rarity === 'rare');
      return rareMonsters.every(m => m.obtained > 0);
    },
    reward: 10000
  },
  {
    id: 'complete_epic',
    name: 'Collection Épique',
    description: 'Obtenir toutes les Monster épiques',
    icon: '🟣',
    isHidden: false,
    condition: (state) => {
      const epicMonsters = state.monstersCollection.filter(m => m.rarity === 'épique');
      return epicMonsters.every(m => m.obtained > 0);
    },
    reward: 50000
  },
  {
    id: 'completionist',
    name: 'Complétionniste',
    description: 'Obtenir toutes les Monster du jeu',
    icon: '👑',
    isHidden: false,
    condition: (state) => state.monstersCollection.every(m => m.obtained > 0),
    reward: 100000
  },

  // Hidden Achievements (25)
  {
    id: 'secret_clicker',
    name: 'Cliqueur Secret',
    description: 'Effectuer exactement 1337 clics',
    icon: '🕵️',
    isHidden: true,
    condition: (state) => state.totalClicks === 1337,
    reward: 1337
  },
  {
    id: 'unlucky_number',
    name: 'Nombre Maudit',
    description: 'Posséder exactement 666 roupies',
    icon: '😈',
    isHidden: true,
    condition: (state) => state.rupees === 666,
    reward: 666
  },
  {
    id: 'lucky_seven',
    name: 'Sept Chanceux',
    description: 'Posséder exactement 7777 roupies',
    icon: '🍀',
    isHidden: true,
    condition: (state) => state.rupees === 7777,
    reward: 777
  },
  {
    id: 'casino_addict',
    name: 'Accro au Casino',
    description: 'Perdre 50 parties au casino',
    icon: '🎰',
    isHidden: true,
    condition: (state) => state.totalCasinoLosses >= 50,
    reward: 1000
  },
  {
    id: 'persistent_loser',
    name: 'Perdant Persistant',
    description: 'Perdre 10 parties d\'affilée au casino',
    icon: '💸',
    isHidden: true,
    condition: (state) => state.totalCasinoLosses >= 10,
    reward: 500
  },
  {
    id: 'monster_hoarder',
    name: 'Accumulateur de Monster',
    description: 'Obtenir 100 Monster au total',
    icon: '🗃️',
    isHidden: true,
    condition: (state) => state.monstersCollection.reduce((sum, m) => sum + m.obtained, 0) >= 100,
    reward: 5000
  },
  {
    id: 'ethan_lover',
    name: 'Amoureux d\'Ethan',
    description: 'Posséder 50 Ethan',
    icon: '🤪',
    isHidden: true,
    condition: (state) => state.guillaumes.find(g => g.id === 'g1')?.owned >= 50,
    reward: 2500
  },
  {
    id: 'mistinguett_master',
    name: 'Maître Mistinguett',
    description: 'Posséder 10 Mistinguett',
    icon: '🤡',
    isHidden: true,
    condition: (state) => state.guillaumes.find(g => g.id === 'g4')?.owned >= 10,
    reward: 10000
  },
  {
    id: 'balanced_team',
    name: 'Équipe Équilibrée',
    description: 'Posséder au moins 5 de chaque Guillaume',
    icon: '⚖️',
    isHidden: true,
    condition: (state) => state.guillaumes.every(g => g.owned >= 5),
    reward: 7500
  },
  {
    id: 'ticket_waster',
    name: 'Gaspilleur de Tickets',
    description: 'Gratter 100 tickets sans obtenir d\'épique',
    icon: '🗑️',
    isHidden: true,
    condition: (state) => state.totalTicketsScratched >= 100 && !state.monstersCollection.some(m => m.rarity === 'épique' && m.obtained > 0),
    reward: 5000
  },
  {
    id: 'omega_hunter',
    name: 'Chasseur Omega',
    description: 'Obtenir la Monster Omega',
    icon: '♾️',
    isHidden: true,
    condition: (state) => state.monstersCollection.find(m => m.id === 'm50')?.obtained > 0,
    reward: 25000
  },
  {
    id: 'kraken_slayer',
    name: 'Tueur de Kraken',
    description: 'Obtenir 5 Monster Kraken',
    icon: '🐙',
    isHidden: true,
    condition: (state) => state.monstersCollection.find(m => m.id === 'm46')?.obtained >= 5,
    reward: 15000
  },
  {
    id: 'rainbow_collector',
    name: 'Collectionneur Arc-en-ciel',
    description: 'Obtenir au moins une Monster de chaque couleur',
    icon: '🌈',
    isHidden: true,
    condition: (state) => {
      const colorMonsters = ['m2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9']; // Green, Blue, Red, White, Yellow, Orange, Purple, Pink
      return colorMonsters.every(id => state.monstersCollection.find(m => m.id === id)?.obtained > 0);
    },
    reward: 3000
  },
  {
    id: 'power_overwhelming',
    name: 'Puissance Écrasante',
    description: 'Atteindre x1000 de puissance de clic',
    icon: '💥',
    isHidden: true,
    condition: (state) => state.maxClickPower >= 1000,
    reward: 50000
  },
  {
    id: 'click_master',
    name: 'Maître du Clic',
    description: 'Effectuer 100,000 clics',
    icon: '🏆',
    isHidden: true,
    condition: (state) => state.totalClicks >= 100000,
    reward: 25000
  },
  {
    id: 'money_printer',
    name: 'Imprimante à Argent',
    description: 'Gagner 10,000,000 roupies au total',
    icon: '🖨️',
    isHidden: true,
    condition: (state) => state.totalMoneyEarned >= 10000000,
    reward: 100000
  },
  {
    id: 'building_speedrun',
    name: 'Speedrun Bâtiment',
    description: 'Atteindre la villa en moins de 1000 clics',
    icon: '🏃',
    isHidden: true,
    condition: (state) => state.currentBuilding >= 5 && state.totalClicks <= 1000,
    reward: 20000
  },
  {
    id: 'patient_player',
    name: 'Joueur Patient',
    description: 'Jouer pendant plus d\'une heure (3600 clics automatiques)',
    icon: '⏰',
    isHidden: true,
    condition: (state) => state.totalClicks >= 3600,
    reward: 5000
  },
  {
    id: 'lucky_streak',
    name: 'Série Chanceuse',
    description: 'Gagner 20 parties d\'affilée au casino',
    icon: '🎯',
    isHidden: true,
    condition: (state) => state.totalCasinoWins >= 20 && state.totalCasinoLosses === 0,
    reward: 10000
  },
  {
    id: 'monster_duplicate',
    name: 'Duplicateur de Monster',
    description: 'Obtenir 10 fois la même Monster',
    icon: '👯',
    isHidden: true,
    condition: (state) => state.monstersCollection.some(m => m.obtained >= 10),
    reward: 2000
  },
  {
    id: 'all_commons',
    name: 'Roi des Communes',
    description: 'Obtenir au moins 5 de chaque Monster commune',
    icon: '👑',
    isHidden: true,
    condition: (state) => {
      const commonMonsters = state.monstersCollection.filter(m => m.rarity === 'commun');
      return commonMonsters.every(m => m.obtained >= 5);
    },
    reward: 10000
  },
  {
    id: 'zero_waste',
    name: 'Zéro Gaspillage',
    description: 'Dépenser exactement toutes vos roupies (avoir 0)',
    icon: '💸',
    isHidden: true,
    condition: (state) => state.rupees === 0 && state.totalMoneyEarned > 1000,
    reward: 1000
  },
  {
    id: 'guillaume_equality',
    name: 'Égalité Guillaume',
    description: 'Posséder exactement le même nombre de chaque Guillaume',
    icon: '🤝',
    isHidden: true,
    condition: (state) => {
      const counts = state.guillaumes.map(g => g.owned);
      return counts.every(count => count === counts[0] && count > 0);
    },
    reward: 5000
  },
  {
    id: 'monster_minimalist',
    name: 'Minimaliste Monster',
    description: 'Obtenir une Monster monstrueuse avec moins de 10 tickets grattés',
    icon: '🎯',
    isHidden: true,
    condition: (state) => state.totalTicketsScratched < 10 && state.monstersCollection.some(m => m.rarity === 'monstrueux' && m.obtained > 0),
    reward: 50000
  },
  {
    id: 'ultimate_collector',
    name: 'Collectionneur Ultime',
    description: 'Obtenir au moins 3 de chaque Monster du jeu',
    icon: '🏆',
    isHidden: true,
    condition: (state) => state.monstersCollection.every(m => m.obtained >= 3),
    reward: 500000
  }
]