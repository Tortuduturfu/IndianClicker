import { Achievement } from '../types/game';

export const achievementsData: Omit<Achievement, 'isUnlocked'>[] = [
  // Visible Achievements (40)
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
    id: 'ten_thousand_clicks',
    name: 'Cliqueur Dévoué',
    description: 'Effectuer 10,000 clics',
    icon: '⚡',
    isHidden: false,
    condition: (state) => state.totalClicks >= 10000,
    reward: 1000
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
    id: 'multi_millionaire',
    name: 'Multi-Millionnaire',
    description: 'Posséder 10,000,000 roupies',
    icon: '👑',
    isHidden: false,
    condition: (state) => state.rupees >= 10000000,
    reward: 500000
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
    id: 'guillaume_empire',
    name: 'Empire Guillaume',
    description: 'Posséder 100 Guillaume au total',
    icon: '🏛️',
    isHidden: false,
    condition: (state) => state.guillaumes.reduce((sum, g) => sum + g.owned, 0) >= 100,
    reward: 5000
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
    id: 'ticket_master',
    name: 'Maître des Tickets',
    description: 'Gratter 200 tickets',
    icon: '🎪',
    isHidden: false,
    condition: (state) => state.totalTicketsScratched >= 200,
    reward: 5000
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
    id: 'monster_enthusiast',
    name: 'Passionné Monster',
    description: 'Obtenir 25 Monster différentes',
    icon: '🎯',
    isHidden: false,
    condition: (state) => state.monstersCollection.filter(m => m.obtained > 0).length >= 25,
    reward: 2500
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
    id: 'casino_legend',
    name: 'Légende du Casino',
    description: 'Gagner 500 parties au casino',
    icon: '🏆',
    isHidden: false,
    condition: (state) => state.totalCasinoWins >= 500,
    reward: 10000
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
  {
    id: 'big_spender',
    name: 'Gros Dépensier',
    description: 'Dépenser 1,000,000 roupies au total',
    icon: '💸',
    isHidden: false,
    condition: (state) => (state.totalCasinoBet || 0) + state.guillaumes.reduce((sum, g) => sum + (g.basePrice * g.owned), 0) >= 1000000,
    reward: 25000
  },
  {
    id: 'blackjack_master',
    name: 'Maître du Blackjack',
    description: 'Gagner 50 parties de Blackjack',
    icon: '🃏',
    isHidden: false,
    condition: (state) => (state.blackjackWins || 0) >= 50,
    reward: 3000
  },
  {
    id: 'roulette_champion',
    name: 'Champion de Roulette',
    description: 'Gagner 50 parties de Roulette',
    icon: '🎯',
    isHidden: false,
    condition: (state) => (state.rouletteWins || 0) >= 50,
    reward: 3000
  },
  {
    id: 'slot_king',
    name: 'Roi des Machines',
    description: 'Gagner 50 parties aux machines à sous',
    icon: '🎰',
    isHidden: false,
    condition: (state) => (state.slotWins || 0) >= 50,
    reward: 3000
  },
  {
    id: 'jackpot_winner',
    name: 'Gagnant du Jackpot',
    description: 'Gagner plus de 100,000 roupies en une seule fois',
    icon: '💰',
    isHidden: false,
    condition: (state) => (state.biggestWin || 0) >= 100000,
    reward: 15000
  },
  {
    id: 'automation_master',
    name: 'Maître de l\'Automatisation',
    description: 'Avoir 1000 clics/sec automatiques',
    icon: '🤖',
    isHidden: false,
    condition: (state) => state.guillaumes.reduce((sum, g) => sum + g.clicksPerSecond * g.owned, 0) >= 1000,
    reward: 50000
  },
  {
    id: 'persistent_player',
    name: 'Joueur Persistant',
    description: 'Effectuer 100,000 clics au total',
    icon: '🏃',
    isHidden: false,
    condition: (state) => state.totalClicks >= 100000,
    reward: 25000
  },
  {
    id: 'money_maker',
    name: 'Faiseur d\'Argent',
    description: 'Gagner 50,000,000 roupies au total',
    icon: '🏦',
    isHidden: false,
    condition: (state) => state.totalMoneyEarned >= 50000000,
    reward: 1000000
  },
  {
    id: 'building_master',
    name: 'Maître Bâtisseur',
    description: 'Atteindre le niveau de bâtiment maximum',
    icon: '🏗️',
    isHidden: false,
    condition: (state) => state.currentBuilding >= 5,
    reward: 20000
  },

  // Hidden Achievements (40)
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
      const colorMonsters = ['m2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9'];
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
    id: 'money_printer',
    name: 'Imprimante à Argent',
    description: 'Gagner 100,000,000 roupies au total',
    icon: '🖨️',
    isHidden: true,
    condition: (state) => state.totalMoneyEarned >= 100000000,
    reward: 2000000
  },
  {
    id: 'casino_addict',
    name: 'Accro au Casino',
    description: 'Perdre 100 parties au casino',
    icon: '🎰',
    isHidden: true,
    condition: (state) => state.totalCasinoLosses >= 100,
    reward: 5000
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
  },
  {
    id: 'casino_streak',
    name: 'Série Casino',
    description: 'Gagner 10 parties d\'affilée au casino',
    icon: '🔥',
    isHidden: true,
    condition: (state) => state.totalCasinoWins >= 10 && state.totalCasinoLosses === 0,
    reward: 8000
  },
  {
    id: 'ticket_lucky',
    name: 'Chanceux aux Tickets',
    description: 'Obtenir 3 Monster épiques ou monstrueuses en 10 tickets',
    icon: '🍀',
    isHidden: true,
    condition: (state) => {
      const rareCount = state.monstersCollection.filter(m => (m.rarity === 'épique' || m.rarity === 'monstrueux') && m.obtained > 0).length;
      return state.totalTicketsScratched <= 10 && rareCount >= 3;
    },
    reward: 15000
  },
  {
    id: 'speed_runner',
    name: 'Speedrunner',
    description: 'Atteindre 1,000,000 roupies en moins de 5000 clics',
    icon: '🏃‍♂️',
    isHidden: true,
    condition: (state) => state.rupees >= 1000000 && state.totalClicks <= 5000,
    reward: 50000
  },
  {
    id: 'patient_investor',
    name: 'Investisseur Patient',
    description: 'Posséder 100 Guillaume sans jamais aller au casino',
    icon: '📈',
    isHidden: true,
    condition: (state) => state.guillaumes.reduce((sum, g) => sum + g.owned, 0) >= 100 && state.totalCasinoWins === 0 && state.totalCasinoLosses === 0,
    reward: 25000
  },
  {
    id: 'monster_variety',
    name: 'Variété Monster',
    description: 'Obtenir au moins une Monster de chaque rareté',
    icon: '🎨',
    isHidden: true,
    condition: (state) => {
      const rarities = ['commun', 'rare', 'épique', 'monstrueux'];
      return rarities.every(rarity => 
        state.monstersCollection.some(m => m.rarity === rarity && m.obtained > 0)
      );
    },
    reward: 5000
  },
  {
    id: 'click_efficiency',
    name: 'Efficacité de Clic',
    description: 'Gagner 10,000,000 roupies avec moins de 1000 clics manuels',
    icon: '⚙️',
    isHidden: true,
    condition: (state) => state.totalMoneyEarned >= 10000000 && state.totalClicks <= 1000,
    reward: 100000
  },
  {
    id: 'casino_master',
    name: 'Maître du Casino',
    description: 'Gagner au moins 10 parties dans chaque jeu de casino',
    icon: '🎪',
    isHidden: true,
    condition: (state) => (state.blackjackWins || 0) >= 10 && (state.rouletteWins || 0) >= 10 && (state.slotWins || 0) >= 10,
    reward: 15000
  },
  {
    id: 'monster_economist',
    name: 'Économiste Monster',
    description: 'Obtenir 50 Monster différentes sans acheter de Guillaume',
    icon: '💼',
    isHidden: true,
    condition: (state) => {
      const uniqueMonsters = state.monstersCollection.filter(m => m.obtained > 0).length;
      const totalGuillaume = state.guillaumes.reduce((sum, g) => sum + g.owned, 0);
      return uniqueMonsters >= 50 && totalGuillaume === 0;
    },
    reward: 75000
  },
  {
    id: 'building_speedrun',
    name: 'Construction Rapide',
    description: 'Atteindre la villa en moins de 2000 clics',
    icon: '🏗️',
    isHidden: true,
    condition: (state) => state.currentBuilding >= 5 && state.totalClicks <= 2000,
    reward: 30000
  },
  {
    id: 'ticket_hoarder',
    name: 'Collectionneur de Tickets',
    description: 'Posséder 50 tickets à gratter en même temps',
    icon: '🎫',
    isHidden: true,
    condition: (state) => state.scratchTickets >= 50,
    reward: 10000
  },
  {
    id: 'monster_trader',
    name: 'Commerçant Monster',
    description: 'Obtenir 500 Monster au total',
    icon: '🏪',
    isHidden: true,
    condition: (state) => state.monstersCollection.reduce((sum, m) => sum + m.obtained, 0) >= 500,
    reward: 100000
  },
  {
    id: 'automation_god',
    name: 'Dieu de l\'Automatisation',
    description: 'Avoir 10,000 clics/sec automatiques',
    icon: '🔮',
    isHidden: true,
    condition: (state) => state.guillaumes.reduce((sum, g) => sum + g.clicksPerSecond * g.owned, 0) >= 10000,
    reward: 1000000
  },
  {
    id: 'casino_whale',
    name: 'Baleine du Casino',
    description: 'Miser plus de 10,000,000 roupies au total',
    icon: '🐋',
    isHidden: true,
    condition: (state) => (state.totalCasinoBet || 0) >= 10000000,
    reward: 500000
  },
  {
    id: 'monster_perfectionist',
    name: 'Perfectionniste Monster',
    description: 'Obtenir exactement 10 de chaque Monster commune',
    icon: '🎯',
    isHidden: true,
    condition: (state) => {
      const commonMonsters = state.monstersCollection.filter(m => m.rarity === 'commun');
      return commonMonsters.every(m => m.obtained === 10);
    },
    reward: 50000
  },
  {
    id: 'click_master_supreme',
    name: 'Maître Suprême du Clic',
    description: 'Effectuer 1,000,000 clics au total',
    icon: '👑',
    isHidden: true,
    condition: (state) => state.totalClicks >= 1000000,
    reward: 500000
  },
  {
    id: 'fortune_builder',
    name: 'Bâtisseur de Fortune',
    description: 'Gagner 1,000,000,000 roupies au total',
    icon: '🏰',
    isHidden: true,
    condition: (state) => state.totalMoneyEarned >= 1000000000,
    reward: 10000000
  },
  {
    id: 'monster_legend',
    name: 'Légende Monster',
    description: 'Obtenir 100 Monster monstrueuses',
    icon: '🌟',
    isHidden: true,
    condition: (state) => {
      const legendaryCount = state.monstersCollection
        .filter(m => m.rarity === 'monstrueux')
        .reduce((sum, m) => sum + m.obtained, 0);
      return legendaryCount >= 100;
    },
    reward: 1000000
  },
  {
    id: 'guillaume_tycoon',
    name: 'Magnat Guillaume',
    description: 'Posséder 1000 Guillaume au total',
    icon: '💰',
    isHidden: true,
    condition: (state) => state.guillaumes.reduce((sum, g) => sum + g.owned, 0) >= 1000,
    reward: 500000
  },
  {
    id: 'casino_legend_supreme',
    name: 'Légende Suprême du Casino',
    description: 'Gagner 1000 parties au casino',
    icon: '👑',
    isHidden: true,
    condition: (state) => state.totalCasinoWins >= 1000,
    reward: 1000000
  },
  {
    id: 'ticket_master_supreme',
    name: 'Maître Suprême des Tickets',
    description: 'Gratter 1000 tickets',
    icon: '🎪',
    isHidden: true,
    condition: (state) => state.totalTicketsScratched >= 1000,
    reward: 500000
  },
  {
    id: 'power_infinite',
    name: 'Puissance Infinie',
    description: 'Atteindre x10000 de puissance de clic',
    icon: '♾️',
    isHidden: true,
    condition: (state) => state.maxClickPower >= 10000,
    reward: 5000000
  },
  {
    id: 'ultimate_master',
    name: 'Maître Ultime',
    description: 'Débloquer tous les autres succès',
    icon: '🏆',
    isHidden: true,
    condition: (state) => {
      const totalAchievements = 79; // Total moins ce succès
      const unlockedCount = state.achievements.filter(a => a.isUnlocked && a.id !== 'ultimate_master').length;
      return unlockedCount >= totalAchievements;
    },
    reward: 10000000
  },
  {
    id: 'monster_god',
    name: 'Dieu Monster',
    description: 'Obtenir 1000 Monster au total',
    icon: '⚡',
    isHidden: true,
    condition: (state) => state.monstersCollection.reduce((sum, m) => sum + m.obtained, 0) >= 1000,
    reward: 2000000
  },
  {
    id: 'billionaire',
    name: 'Milliardaire',
    description: 'Posséder 1,000,000,000 roupies',
    icon: '💎',
    isHidden: true,
    condition: (state) => state.rupees >= 1000000000,
    reward: 100000000
  },
  {
    id: 'mega_jackpot',
    name: 'Méga Jackpot',
    description: 'Gagner plus de 1,000,000 roupies en une seule fois',
    icon: '🎰',
    isHidden: true,
    condition: (state) => (state.biggestWin || 0) >= 1000000,
    reward: 500000
  }
];