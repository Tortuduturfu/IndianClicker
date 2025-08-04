import React, { useState, useEffect, useCallback } from 'react';
import { Tab, GameState, Monster, Achievement, Theme } from './types/game';
import { monstersData } from './data/monsters';
import { guillaumesData } from './data/guillaumes';
import { achievementsData } from './data/achievements';
import { generateRandomMonster, TICKET_PRICE } from './utils/scratchLogic';
import Travail from './components/Travail';
import Casino from './components/Casino';
import StationService from './components/StationService';
import Collection from './components/Collection';
import Achievements from './components/Achievements';
import Settings from './components/Settings';
import ScratchTicket from './components/ScratchTicket';
import AchievementNotification from './components/AchievementNotification';

// Fonction pour appliquer les thèmes
const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') return;
  
  document.documentElement.setAttribute('data-theme', theme);
  document.body.className = `theme-${theme}`;
  
  const root = document.documentElement;
  
  switch(theme) {
    case 'dark':
      root.style.setProperty('--bg-primary', '#1a1a2e');
      root.style.setProperty('--bg-secondary', '#16213e');
      root.style.setProperty('--bg-tertiary', '#0f172a');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#e2e8f0');
      root.style.setProperty('--accent', '#3b82f6');
      root.style.setProperty('--accent-hover', '#2563eb');
      root.style.setProperty('--success', '#10b981');
      root.style.setProperty('--warning', '#f59e0b');
      root.style.setProperty('--danger', '#ef4444');
      root.style.setProperty('--border', '#374151');
      root.style.setProperty('--shadow', 'rgba(0, 0, 0, 0.3)');
      break;
    case 'light':
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f8fafc');
      root.style.setProperty('--bg-tertiary', '#f1f5f9');
      root.style.setProperty('--text-primary', '#1e293b');
      root.style.setProperty('--text-secondary', '#475569');
      root.style.setProperty('--accent', '#3b82f6');
      root.style.setProperty('--accent-hover', '#2563eb');
      root.style.setProperty('--success', '#10b981');
      root.style.setProperty('--warning', '#f59e0b');
      root.style.setProperty('--danger', '#ef4444');
      root.style.setProperty('--border', '#e2e8f0');
      root.style.setProperty('--shadow', 'rgba(0, 0, 0, 0.1)');
      break;
    case 'neon':
      root.style.setProperty('--bg-primary', '#0a0a0f');
      root.style.setProperty('--bg-secondary', '#1a0d2e');
      root.style.setProperty('--bg-tertiary', '#2d1b4e');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#e879f9');
      root.style.setProperty('--accent', '#f59e0b');
      root.style.setProperty('--accent-hover', '#d97706');
      root.style.setProperty('--success', '#00ff88');
      root.style.setProperty('--warning', '#ffff00');
      root.style.setProperty('--danger', '#ff0055');
      root.style.setProperty('--border', '#7c3aed');
      root.style.setProperty('--shadow', 'rgba(124, 58, 237, 0.3)');
      break;
    case 'forest':
      root.style.setProperty('--bg-primary', '#1a2e1a');
      root.style.setProperty('--bg-secondary', '#2d4a2d');
      root.style.setProperty('--bg-tertiary', '#0f1f0f');
      root.style.setProperty('--text-primary', '#f0fff0');
      root.style.setProperty('--text-secondary', '#90ee90');
      root.style.setProperty('--accent', '#22c55e');
      root.style.setProperty('--accent-hover', '#16a34a');
      root.style.setProperty('--success', '#4ade80');
      root.style.setProperty('--warning', '#facc15');
      root.style.setProperty('--danger', '#f87171');
      root.style.setProperty('--border', '#15803d');
      root.style.setProperty('--shadow', 'rgba(34, 197, 94, 0.2)');
      break;
    case 'ocean':
      root.style.setProperty('--bg-primary', '#0c1445');
      root.style.setProperty('--bg-secondary', '#1e3a8a');
      root.style.setProperty('--bg-tertiary', '#1e40af');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#93c5fd');
      root.style.setProperty('--accent', '#06b6d4');
      root.style.setProperty('--accent-hover', '#0891b2');
      root.style.setProperty('--success', '#0ea5e9');
      root.style.setProperty('--warning', '#f59e0b');
      root.style.setProperty('--danger', '#f97316');
      root.style.setProperty('--border', '#1d4ed8');
      root.style.setProperty('--shadow', 'rgba(6, 182, 212, 0.3)');
      break;
    case 'sunset':
      root.style.setProperty('--bg-primary', '#451a03');
      root.style.setProperty('--bg-secondary', '#7c2d12');
      root.style.setProperty('--bg-tertiary', '#a16207');
      root.style.setProperty('--text-primary', '#fef7cd');
      root.style.setProperty('--text-secondary', '#fed7aa');
      root.style.setProperty('--accent', '#f97316');
      root.style.setProperty('--accent-hover', '#ea580c');
      root.style.setProperty('--success', '#22c55e');
      root.style.setProperty('--warning', '#eab308');
      root.style.setProperty('--danger', '#dc2626');
      root.style.setProperty('--border', '#ea580c');
      root.style.setProperty('--shadow', 'rgba(249, 115, 22, 0.3)');
      break;
    case 'cyberpunk':
      root.style.setProperty('--bg-primary', '#000000');
      root.style.setProperty('--bg-secondary', '#1a0033');
      root.style.setProperty('--bg-tertiary', '#330066');
      root.style.setProperty('--text-primary', '#00ffff');
      root.style.setProperty('--text-secondary', '#ff00ff');
      root.style.setProperty('--accent', '#ffff00');
      root.style.setProperty('--accent-hover', '#cccc00');
      root.style.setProperty('--success', '#00ff00');
      root.style.setProperty('--warning', '#ff8800');
      root.style.setProperty('--danger', '#ff0080');
      root.style.setProperty('--border', '#ff00ff');
      root.style.setProperty('--shadow', 'rgba(0, 255, 255, 0.4)');
      break;
    case 'retro':
      root.style.setProperty('--bg-primary', '#2c1810');
      root.style.setProperty('--bg-secondary', '#4a2c17');
      root.style.setProperty('--bg-tertiary', '#8b4513');
      root.style.setProperty('--text-primary', '#fff8dc');
      root.style.setProperty('--text-secondary', '#daa520');
      root.style.setProperty('--accent', '#ff6347');
      root.style.setProperty('--accent-hover', '#ff4500');
      root.style.setProperty('--success', '#32cd32');
      root.style.setProperty('--warning', '#ffd700');
      root.style.setProperty('--danger', '#dc143c');
      root.style.setProperty('--border', '#cd853f');
      root.style.setProperty('--shadow', 'rgba(255, 99, 71, 0.3)');
      break;
  }
};

function App() {
  const [activeTab, setActiveTab] = useState<Tab | 'settings'>('travail');
  const [showScratchTicket, setShowScratchTicket] = useState(false);
  const [currentTicketMonster, setCurrentTicketMonster] = useState<Monster | null>(null);
  const [achievementNotification, setAchievementNotification] = useState<Achievement | null>(null);
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem('indian-clicker-save');
      if (saved) {
        const parsedState = JSON.parse(saved);
        
        // Validate that critical arrays exist and are arrays
        if (parsedState && 
            Array.isArray(parsedState.guillaumes) &&
            Array.isArray(parsedState.monstersCollection) &&
            Array.isArray(parsedState.achievements)) {
          
          // Restore achievement condition functions from achievementsData
          const restoredAchievements = achievementsData.map(originalAchievement => {
            const savedAchievement = parsedState.achievements.find(
              (saved: any) => saved.id === originalAchievement.id
            );
            return {
              ...originalAchievement,
              isUnlocked: savedAchievement ? savedAchievement.isUnlocked : false
            };
          });
          
          parsedState.achievements = restoredAchievements;
          return parsedState;
        }
      }
    } catch (error) {
      console.warn('Failed to load saved game state, starting fresh:', error);
      // Clear corrupted save data
      localStorage.removeItem('indian-clicker-save');
    }
    
    // Return default state if loading failed or data is invalid
    return {
      rupees: 10,
      totalClicks: 0,
      clickPower: 1,
      maxClickPower: 1,
      guillaumes: guillaumesData.map(g => ({ ...g, currentPrice: g.basePrice, owned: 0 })),
      monstersCollection: monstersData.map(m => ({ ...m, currentPrice: m.basePrice, obtained: 0 })),
      currentBuilding: 0,
      scratchTickets: 0,
      achievements: achievementsData.map(a => ({ ...a, isUnlocked: false })),
      totalMoneyEarned: 0,
      totalTicketsScratched: 0,
      totalCasinoWins: 0,
      totalCasinoLosses: 0,
      totalCasinoBet: 0,
      biggestWin: 0,
      blackjackWins: 0,
      rouletteWins: 0,
      slotWins: 0,
      settings: {
        theme: 'dark',
        soundVolume: 50,
        musicVolume: 30
      }
    };
  });

  // Appliquer le thème au démarrage de l'application
  useEffect(() => {
    applyTheme(gameState.settings.theme);
  }, [gameState.settings.theme]);

  // Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem('indian-clicker-save', JSON.stringify(gameState));
  }, [gameState]);

  // Calcul du niveau de bâtiment basé sur les roupies
  useEffect(() => {
    let newBuilding = 0;
    if (gameState.rupees >= 50000) newBuilding = 5;
    else if (gameState.rupees >= 25000) newBuilding = 4;
    else if (gameState.rupees >= 10000) newBuilding = 3;
    else if (gameState.rupees >= 2500) newBuilding = 2;
    else if (gameState.rupees >= 500) newBuilding = 1;

    if (newBuilding !== gameState.currentBuilding) {
      setGameState(prev => ({ ...prev, currentBuilding: newBuilding }));
    }
  }, [gameState.rupees, gameState.currentBuilding]);

  // Gains automatiques des Guillaume
  useEffect(() => {
    const interval = setInterval(() => {
      const totalClicksPerSecond = gameState.guillaumes.reduce(
        (sum, guillaume) => sum + guillaume.clicksPerSecond * guillaume.owned,
        0
      );
      
      if (totalClicksPerSecond > 0) {
        setGameState(prev => ({
          ...prev,
          rupees: prev.rupees + totalClicksPerSecond * prev.clickPower,
          totalClicks: prev.totalClicks + totalClicksPerSecond
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.guillaumes, gameState.clickPower]);

  const handleClick = () => {
    setGameState(prev => ({
      ...prev,
      rupees: prev.rupees + prev.clickPower,
      totalClicks: prev.totalClicks + 1,
      totalMoneyEarned: prev.totalMoneyEarned + prev.clickPower,
      maxClickPower: Math.max(prev.maxClickPower, prev.clickPower)
    }));
  };

  const updateRupees = (amount: number) => {
    setGameState(prev => ({
      ...prev,
      rupees: prev.rupees + amount,
      totalMoneyEarned: amount > 0 ? prev.totalMoneyEarned + amount : prev.totalMoneyEarned
    }));
  };

  const updateStats = (stats: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...stats }));
  };

  const buyTicket = () => {
    if (gameState.rupees >= TICKET_PRICE) {
      setGameState(prev => ({
        ...prev,
        rupees: prev.rupees - TICKET_PRICE,
        scratchTickets: prev.scratchTickets + 1
      }));
      
      // Générer un monster aléatoire pour le ticket
      const randomMonster = generateRandomMonster();
      setCurrentTicketMonster(randomMonster);
      setShowScratchTicket(true);
    }
  };

  const handleTicketReveal = (monster: Monster) => {
    setGameState(prev => {
      const newMonsters = prev.monstersCollection.map(m => {
        if (m.id === monster.id) {
          return {
            ...m,
            obtained: m.obtained + 1
          };
        }
        return m;
      });

      return {
        ...prev,
        monstersCollection: newMonsters,
        scratchTickets: prev.scratchTickets - 1,
        totalTicketsScratched: prev.totalTicketsScratched + 1
      };
    });

    // Check for achievements after ticket reveal
    checkAchievements();
  };

  const closeScratchTicket = () => {
    setShowScratchTicket(false);
    setCurrentTicketMonster(null);
  };

  const buyGuillaume = (guillaumeId: string) => {
    const guillaume = gameState.guillaumes.find(g => g.id === guillaumeId);
    if (guillaume && gameState.rupees >= guillaume.currentPrice) {
      setGameState(prev => ({
        ...prev,
        rupees: prev.rupees - guillaume.currentPrice,
        guillaumes: prev.guillaumes.map(g => 
          g.id === guillaumeId 
            ? { 
                ...g, 
                owned: g.owned + 1,
                currentPrice: Math.floor(g.currentPrice * 1.2) // Prix augmente de 20%
              }
            : g
        )
      }));
    }
  };

  // Check achievements
  const checkAchievements = () => {
    setGameState(prev => {
      const updatedAchievements = prev.achievements.map(achievement => {
        if (!achievement.isUnlocked && achievement.condition(prev)) {
          // Show notification
          setAchievementNotification(achievement);
          
          // Award bonus rupees for unlocking achievement
          if (achievement.reward) {
            setTimeout(() => {
              setGameState(current => ({
                ...current,
                rupees: current.rupees + (achievement.reward || 0),
                totalMoneyEarned: current.totalMoneyEarned + (achievement.reward || 0)
              }));
            }, 100);
          }
          return { ...achievement, isUnlocked: true };
        }
        return achievement;
      });

      return {
        ...prev,
        achievements: updatedAchievements
      };
    });
  };

  // Check achievements on game state changes
  React.useEffect(() => {
    checkAchievements();
  }, [gameState.totalClicks, gameState.rupees, gameState.totalMoneyEarned, gameState.currentBuilding, gameState.maxClickPower]);

  const updateSettings = (newSettings: Partial<GameState['settings']>) => {
    setGameState(prev => {
      const updatedSettings = { ...prev.settings, ...newSettings };
      
      // Si le thème change, l'appliquer immédiatement
      if (newSettings.theme && newSettings.theme !== prev.settings.theme) {
        applyTheme(newSettings.theme);
      }
      
      return {
        ...prev,
        settings: updatedSettings
      };
    });
  };

  const resetGame = () => {
    localStorage.removeItem('indian-clicker-save');
    window.location.reload();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'travail':
        return <Travail gameState={gameState} onClic={handleClick} />;
      case 'casino':
        return <Casino gameState={gameState} onUpdateRupees={updateRupees} onUpdateStats={updateStats} />;
      case 'station-service':
        return (
          <StationService
            gameState={gameState}
            onBuyTicket={buyTicket}
            onBuyGuillaume={buyGuillaume}
          />
        );
      case 'collection':
        return <Collection monstersCollection={gameState.monstersCollection} />;
      case 'achievements':
        return <Achievements achievements={gameState.achievements} />;
      case 'settings':
        return (
          <Settings
            gameState={gameState}
            onUpdateSettings={updateSettings}
            onResetGame={resetGame}
          />
        );
      default:
        return <Travail gameState={gameState} onClic={handleClick} />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Notification de succès */}
      {achievementNotification && (
        <AchievementNotification
          achievement={achievementNotification}
          onClose={() => setAchievementNotification(null)}
          soundVolume={gameState.settings.soundVolume}
        />
      )}

      {/* Ticket à gratter modal */}
      {showScratchTicket && currentTicketMonster && (
        <ScratchTicket
          monster={currentTicketMonster}
          onReveal={handleTicketReveal}
          onClose={closeScratchTicket}
        />
      )}

      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'travail', name: 'Travail', icon: '💼' },
              { id: 'casino', name: 'Casino', icon: '🎰' },
              { id: 'station-service', name: 'Station-Service', icon: '⛽' },
              { id: 'collection', name: 'Collection', icon: '📚' },
              { id: 'achievements', name: 'Succès', icon: '🏆' },
              { id: 'settings', name: 'Paramètres', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab | 'settings')}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-yellow-400 text-yellow-400'
                    : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Contenu */}
      {renderContent()}
    </div>
  );
}

export default App;