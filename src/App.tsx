import React, { useState, useEffect, useCallback } from 'react';
import { Tab, GameState, Monster } from './types/game';
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

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('travail');
  const [showScratchTicket, setShowScratchTicket] = useState(false);
  const [currentTicketMonster, setCurrentTicketMonster] = useState<Monster | null>(null);
  
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem('indian-clicker-save');
      if (saved) {
        const parsedState = JSON.parse(saved);
        
        if (parsedState && 
            Array.isArray(parsedState.guillaumes) &&
            Array.isArray(parsedState.monstersCollection) &&
            Array.isArray(parsedState.achievements)) {
          
          const restoredAchievements = achievementsData.map(originalAchievement => {
            const savedAchievement = parsedState.achievements.find(
              (saved: any) => saved.id === originalAchievement.id
            );
            return {
              ...originalAchievement,
              isUnlocked: savedAchievement ? savedAchievement.isUnlocked : false
            };
          });
          
          // Assurer la présence des settings
          const settings = parsedState.settings || {
            theme: 'dark',
            soundVolume: 50
          };
          
          return {
            ...parsedState,
            achievements: restoredAchievements,
            settings,
            maxClickPower: parsedState.maxClickPower || parsedState.clickPower || 1
          };
        }
      }
    } catch (error) {
      console.warn('Failed to load saved game state, starting fresh:', error);
      localStorage.removeItem('indian-clicker-save');
    }
    
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
        soundVolume: 50
      }
    };
  });

  // Appliquer le thème au chargement
  useEffect(() => {
    applyTheme(gameState.settings.theme);
  }, [gameState.settings.theme]);

  const applyTheme = (theme: string) => {
    if (typeof document === 'undefined') return;
    
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = `theme-${theme}`;
    
    const root = document.documentElement;
    
    switch(theme) {
      case 'dark':
        root.style.setProperty('--bg-primary', '#1a1a2e');
        root.style.setProperty('--bg-secondary', '#16213e');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--accent', '#3b82f6');
        break;
      case 'light':
        root.style.setProperty('--bg-primary', '#ffffff');
        root.style.setProperty('--bg-secondary', '#f8fafc');
        root.style.setProperty('--text-primary', '#1e293b');
        root.style.setProperty('--accent', '#3b82f6');
        break;
      case 'neon':
        root.style.setProperty('--bg-primary', '#0a0a0f');
        root.style.setProperty('--bg-secondary', '#1a0d2e');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--accent', '#f59e0b');
        break;
      // Ajoutez les autres thèmes...
    }
  };

  // Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem('indian-clicker-save', JSON.stringify(gameState));
  }, [gameState]);

  // Calcul du niveau de bâtiment
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
      totalMoneyEarned: prev.totalMoneyEarned + prev.clickPower
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

  const updateSettings = (newSettings: Partial<GameState['settings']>) => {
    setGameState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  };

  const resetGame = () => {
    localStorage.removeItem('indian-clicker-save');
    setGameState({
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
        soundVolume: 50
      }
    });
  };

  const buyTicket = () => {
    if (gameState.rupees >= TICKET_PRICE) {
      setGameState(prev => ({
        ...prev,
        rupees: prev.rupees - TICKET_PRICE,
        scratchTickets: prev.scratchTickets + 1
      }));
      
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
                currentPrice: Math.floor(g.currentPrice * 1.2)
              }
            : g
        )
      }));
    }
  };

  const checkAchievements = () => {
    setGameState(prev => {
      const updatedAchievements = prev.achievements.map(achievement => {
        if (!achievement.isUnlocked && achievement.condition(prev)) {
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

  React.useEffect(() => {
    checkAchievements();
  }, [gameState.totalClicks, gameState.rupees, gameState.totalMoneyEarned, gameState.currentBuilding]);

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
      {showScratchTicket && currentTicketMonster && (
        <ScratchTicket
          monster={currentTicketMonster}
          onReveal={handleTicketReveal}
          onClose={closeScratchTicket}
        />
      )}

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
                onClick={() => setActiveTab(tab.id as Tab)}
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

      {renderContent()}
    </div>
  );
}

export default App;