import React, { useState } from 'react';
import { GameState, Theme } from '../types/game';

interface SettingsProps {
  gameState: GameState;
  onUpdateSettings: (settings: Partial<GameState['settings']>) => void;
  onResetGame: () => void;
}

export default function Settings({ gameState, onUpdateSettings, onResetGame }: SettingsProps) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleThemeChange = (theme: Theme) => {
    onUpdateSettings({ theme });
    // Apply theme to document
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      // Forcer le re-render en appliquant les classes CSS directement
      document.body.className = `theme-${theme}`;
      
      // Appliquer les variables CSS selon le thème
      const root = document.documentElement;
      switch(theme) {
        case 'dark':
          root.style.setProperty('--bg-primary', '#1f2937');
          root.style.setProperty('--bg-secondary', '#374151');
          root.style.setProperty('--text-primary', '#ffffff');
          root.style.setProperty('--accent', '#3b82f6');
          break;
        case 'light':
          root.style.setProperty('--bg-primary', '#f3f4f6');
          root.style.setProperty('--bg-secondary', '#ffffff');
          root.style.setProperty('--text-primary', '#1f2937');
          root.style.setProperty('--accent', '#3b82f6');
          break;
        case 'neon':
          root.style.setProperty('--bg-primary', '#581c87');
          root.style.setProperty('--bg-secondary', '#7c3aed');
          root.style.setProperty('--text-primary', '#ffffff');
          root.style.setProperty('--accent', '#f59e0b');
          break;
      }
    }
  };

  const handleVolumeChange = (type: 'soundVolume' | 'musicVolume', value: number) => {
    onUpdateSettings({ [type]: value });
    
    // Appliquer immédiatement les changements de volume à tous les éléments audio
    if (typeof document !== 'undefined') {
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        if (type === 'soundVolume' && audio.classList.contains('sound-effect')) {
          audio.volume = value / 100;
        } else if (type === 'musicVolume' && audio.classList.contains('background-music')) {
          audio.volume = value / 100;
        }
      });
      
      // Sauvegarder les volumes dans le localStorage pour persistance
      localStorage.setItem(`game-${type}`, value.toString());
    }
  };

  const confirmReset = () => {
    onResetGame();
    setShowResetConfirm(false);
  };

  const themes = [
    { id: 'dark' as Theme, name: 'Sombre', icon: '🌙', gradient: 'from-gray-900 to-gray-700' },
    { id: 'light' as Theme, name: 'Clair', icon: '☀️', gradient: 'from-blue-200 to-white' },
    { id: 'neon' as Theme, name: 'Néon', icon: '🌈', gradient: 'from-purple-900 via-pink-900 to-red-900' }
  ];

  // Vérifications de sécurité pour éviter les erreurs
  const safeRupees = gameState?.rupees || 0;
  const safeSettings = gameState?.settings || { theme: 'dark', soundVolume: 50, musicVolume: 50 };
  const safeTotalClicks = gameState?.totalClicks || 0;
  const safeTotalMoneyEarned = gameState?.totalMoneyEarned || 0;
  const safeTotalTicketsScratched = gameState?.totalTicketsScratched || 0;
  const safeTotalCasinoWins = gameState?.totalCasinoWins || 0;
  const safeMonstersCollection = gameState?.monstersCollection || [];
  const safeGuillaumes = gameState?.guillaumes || [];

  // Fonction pour jouer un son de test
  const playTestSound = () => {
    // Créer un son de test pour vérifier le volume
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 440; // Note A4
    gainNode.gain.value = (safeSettings.soundVolume / 100) * 0.1; // Volume réduit pour le test
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2); // Son de 200ms
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-4xl mx-auto">
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
          {/* Thème */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              🎨 THÈME DU JEU
            </h2>
            <div className="space-y-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                    safeSettings.theme === theme.id
                      ? 'border-yellow-400 bg-yellow-400/20'
                      : 'border-white/30 bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{theme.icon}</span>
                      <span className="text-white font-bold">{theme.name}</span>
                    </div>
                    <div className={`w-16 h-8 rounded-full bg-gradient-to-r ${theme.gradient}`}></div>
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
                    🎵 Volume des Effets Sonores: {safeSettings.soundVolume}%
                  </label>
                  <button
                    onClick={playTestSound}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
                  >
                    🔊 Test
                  </button>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={safeSettings.soundVolume}
                  onChange={(e) => handleVolumeChange('soundVolume', parseInt(e.target.value))}
                  className="w-full h-2 bg-white/30 rounded-lg cursor-pointer"
                  style={{
                    WebkitAppearance: 'none',
                    appearance: 'none'
                  }}
                />
              </div>
              <div>
                <label className="block text-white font-bold mb-3">
                  🎶 Volume de la Musique: {safeSettings.musicVolume}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={safeSettings.musicVolume}
                  onChange={(e) => handleVolumeChange('musicVolume', parseInt(e.target.value))}
                  className="w-full h-2 bg-white/30 rounded-lg cursor-pointer"
                  style={{
                    WebkitAppearance: 'none',
                    appearance: 'none'
                  }}
                />
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-white/80 text-sm text-center mb-2">
                  💡 Les paramètres audio affectent tous les sons du jeu
                </div>
                <div className="text-white/60 text-xs text-center">
                  ⚠️ Assurez-vous que vos éléments audio ont les classes 'sound-effect' ou 'background-music'
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
                <div className="text-white font-bold">Clics Totaux</div>
                <div className="text-white/80 text-sm">{safeTotalClicks.toLocaleString('fr-FR')}</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-white font-bold">Argent Gagné</div>
                <div className="text-white/80 text-sm">₹{safeTotalMoneyEarned.toLocaleString('fr-FR')}</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-white font-bold">Tickets Grattés</div>
                <div className="text-white/80 text-sm">{safeTotalTicketsScratched}</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-white font-bold">Victoires Casino</div>
                <div className="text-white/80 text-sm">{safeTotalCasinoWins}</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-white font-bold">Monster Collectées</div>
                <div className="text-white/80 text-sm">
                  {safeMonstersCollection.reduce((sum, m) => sum + (m?.obtained || 0), 0)}
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-white font-bold">Guillaume Possédés</div>
                <div className="text-white/80 text-sm">
                  {safeGuillaumes.reduce((sum, g) => sum + (g?.owned || 0), 0)}
                </div>
              </div>
            </div>
          </div>

          {/* Réinitialisation */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              🔄 RÉINITIALISATION
            </h2>
            <div className="text-center space-y-4">
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
                <div className="text-red-300 font-bold mb-2">⚠️ ATTENTION ⚠️</div>
                <div className="text-white/80 text-sm">
                  Cette action supprimera définitivement toute votre progression !
                </div>
              </div>
              
              {!showResetConfirm ? (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  🗑️ Réinitialiser la Partie
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="text-white font-bold">
                    Êtes-vous vraiment sûr ?
                  </div>
                  <div className="flex space-x-4 justify-center">
                    <button
                      onClick={confirmReset}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                      ✅ Oui, supprimer tout
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
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