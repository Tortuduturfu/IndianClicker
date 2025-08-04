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
    }
  };

  const handleVolumeChange = (type: 'soundVolume' | 'musicVolume', value: number) => {
    onUpdateSettings({ [type]: value });
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
                <label className="block text-white font-bold mb-3">
                  🎵 Volume des Effets Sonores: {safeSettings.soundVolume}%
                </label>
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
                <div className="text-white/80 text-sm text-center">
                  💡 Les paramètres audio affectent tous les sons du jeu
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