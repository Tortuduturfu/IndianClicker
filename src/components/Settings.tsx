import React, { useState, useEffect } from 'react';
import { GameState, Theme } from '../types/game';

interface SettingsProps {
  gameState: GameState;
  onUpdateSettings: (settings: Partial<GameState['settings']>) => void;
  onResetGame: () => void;
}

export default function Settings({ gameState, onUpdateSettings, onResetGame }: SettingsProps) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Appliquer le thème au chargement du composant
  useEffect(() => {
    applyTheme(gameState.settings.theme);
  }, []);

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

  const handleThemeChange = (theme: Theme) => {
    // Appliquer le thème immédiatement
    applyTheme(theme);
    
    // Sauvegarder dans les paramètres
    onUpdateSettings({ theme });
    
    // Sauvegarder dans localStorage pour persistance
    localStorage.setItem('game-theme', theme);
  };

  const handleVolumeChange = (volume: number) => {
    onUpdateSettings({ soundVolume: volume });
    
    // Appliquer immédiatement les changements de volume à tous les éléments audio
    if (typeof document !== 'undefined') {
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        audio.volume = volume / 100;
      });
      
      // Sauvegarder le volume dans le localStorage pour persistance
      localStorage.setItem('game-soundVolume', volume.toString());
    }
  };

  const confirmReset = () => {
    onResetGame();
    setShowResetConfirm(false);
  };

  const themes = [
    { id: 'dark' as Theme, name: 'Sombre', icon: '🌙', gradient: 'from-gray-900 to-gray-700', description: 'Classique et élégant' },
    { id: 'light' as Theme, name: 'Clair', icon: '☀️', gradient: 'from-blue-200 to-white', description: 'Lumineux et moderne' },
    { id: 'neon' as Theme, name: 'Néon', icon: '🌈', gradient: 'from-purple-900 via-pink-900 to-red-900', description: 'Électrisant et vibrant' },
    { id: 'forest' as Theme, name: 'Forêt', icon: '🌲', gradient: 'from-green-900 to-green-600', description: 'Nature et sérénité' },
    { id: 'ocean' as Theme, name: 'Océan', icon: '🌊', gradient: 'from-blue-900 to-cyan-600', description: 'Profondeur marine' },
    { id: 'sunset' as Theme, name: 'Coucher de Soleil', icon: '🌅', gradient: 'from-orange-900 to-yellow-600', description: 'Chaleur et romantisme' },
    { id: 'cyberpunk' as Theme, name: 'Cyberpunk', icon: '🤖', gradient: 'from-black via-purple-900 to-cyan-900', description: 'Futuriste et high-tech' },
    { id: 'retro' as Theme, name: 'Rétro', icon: '📼', gradient: 'from-amber-900 to-orange-700', description: 'Nostalgie vintage' }
  ];

  // Vérifications de sécurité pour éviter les erreurs
  const safeRupees = gameState?.rupees || 0;
  const safeSettings = gameState?.settings || { theme: 'dark', soundVolume: 50 };
  const safeTotalClicks = gameState?.totalClicks || 0;
  const safeTotalMoneyEarned = gameState?.totalMoneyEarned || 0;
  const safeTotalTicketsScratched = gameState?.totalTicketsScratched || 0;
  const safeTotalCasinoWins = gameState?.totalCasinoWins || 0;
  const safeMonstersCollection = gameState?.monstersCollection || [];
  const safeGuillaumes = gameState?.guillaumes || [];

  // Fonction pour jouer un son de test
  const playTestSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 440; // Note A4
      gainNode.gain.value = (safeSettings.soundVolume / 100) * 0.1; // Volume réduit pour le test
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2); // Son de 200ms
    } catch (error) {
      console.warn('Impossible de jouer le son de test:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            ⚙️ PARAMÈTRES ⚙️
          </h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div className="text-2xl font-bold text-white">
              ₹ {safeRupees.toLocaleString('fr-FR')} Roupies
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Thèmes */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              🎨 THÈMES DU JEU
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    safeSettings.theme === theme.id
                      ? 'border-yellow-400 bg-yellow-400/20 transform scale-105'
                      : 'border-white/30 bg-white/10 hover:bg-white/20 hover:border-white/50'
                  }`}
                >
                  <div className="text-center space-y-2">
                    <div className="text-3xl">{theme.icon}</div>
                    <div className="text-white font-bold text-sm">{theme.name}</div>
                    <div className={`w-full h-6 rounded-full bg-gradient-to-r ${theme.gradient}`}></div>
                    <div className="text-white/70 text-xs">{theme.description}</div>
                    {safeSettings.theme === theme.id && (
                      <div className="text-yellow-400 text-xs font-bold">✓ ACTIF</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Audio */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              🔊 PARAMÈTRES AUDIO
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-bold">
                    🎵 Volume des Sons: {safeSettings.soundVolume}%
                  </label>
                  <button
                    onClick={playTestSound}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded transition-colors"
                  >
                    🔊 Test
                  </button>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={safeSettings.soundVolume}
                  onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/30 rounded-lg cursor-pointer"
                  style={{
                    WebkitAppearance: 'none',
                    appearance: 'none'
                  }}
                />
                <div className="flex justify-between text-white/60 text-xs mt-1">
                  <span>Muet</span>
                  <span>Maximum</span>
                </div>
              </div>
              
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-white/80 text-sm text-center mb-2">
                  💡 Ce paramètre affecte tous les effets sonores du jeu
                </div>
                <div className="text-white/60 text-xs text-center">
                  🎮 Clics, notifications, victoires, etc.
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              📊 STATISTIQUES
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-white font-bold text-sm">Clics Totaux</div>
                <div className="text-white/80 text-lg">{safeTotalClicks.toLocaleString('fr-FR')}</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-white font-bold text-sm">Argent Gagné</div>
                <div className="text-white/80 text-lg">₹{safeTotalMoneyEarned.toLocaleString('fr-FR')}</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-white font-bold text-sm">Tickets Grattés</div>
                <div className="text-white/80 text-lg">{safeTotalTicketsScratched}</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-white font-bold text-sm">Victoires Casino</div>
                <div className="text-white/80 text-lg">{safeTotalCasinoWins}</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-white font-bold text-sm">Monstres Collectés</div>
                <div className="text-white/80 text-lg">
                  {safeMonstersCollection.reduce((sum, m) => sum + (m?.obtained || 0), 0)}
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-white font-bold text-sm">Guillaume Possédés</div>
                <div className="text-white/80 text-lg">
                  {safeGuillaumes.reduce((sum, g) => sum + (g?.owned || 0), 0)}
                </div>
              </div>
            </div>
          </div>

          {/* Réinitialisation */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              🔄 RÉINITIALISATION
            </h2>
            <div className="text-center space-y-4 max-w-md mx-auto">
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
                <div className="text-red-300 font-bold mb-2">⚠️ ATTENTION ⚠️</div>
                <div className="text-white/80 text-sm">
                  Cette action supprimera définitivement toute votre progression !<br/>
                  Tous vos monstres, Guillaume, argent et statistiques seront perdus.
                </div>
              </div>
              
              {!showResetConfirm ? (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
                >
                  🗑️ Réinitialiser la Partie
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="text-white font-bold text-lg">
                    Êtes-vous vraiment sûr ?
                  </div>
                  <div className="flex space-x-4 justify-center">
                    <button
                      onClick={confirmReset}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                    >
                      ✅ Oui, supprimer tout
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                    >
                      ❌ Annuler
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div className="text-white text-sm">
              💡 Vos paramètres sont sauvegardés automatiquement !<br/>
              🎮 Profitez de votre expérience de jeu personnalisée !
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}