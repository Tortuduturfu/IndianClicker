import React from 'react';
import { GameState } from '../types/game';

interface TravailProps {
  gameState: GameState;
  onClic: () => void;
}

const buildingStages = [
  { icon: '📦', name: 'Carton de clochard' },
  { icon: '🏚️', name: 'Cabane' },
  { icon: '🏠', name: 'Maison simple' },
  { icon: '🏡', name: 'Belle maison' },
  { icon: '🏘️', name: 'Maison de luxe' },
  { icon: '🏰', name: 'Villa de rêve' },
];

export default function Travail({ gameState, onClic }: TravailProps) {
  const currentBuilding = buildingStages[Math.min(gameState.currentBuilding, buildingStages.length - 1)];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">💰 Clicker Indien 💰</h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div className="text-2xl font-bold text-white">
              ₹ {gameState.rupees.toLocaleString('fr-FR')} Roupies
            </div>
            <div className="text-sm text-white/80">
              Puissance de clic: x{gameState.clickPower}
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="text-lg text-white/90 mb-2">{currentBuilding.name}</div>
            <button
              onClick={onClic}
              className="text-8xl hover:scale-105 transition-transform duration-200 active:scale-95 cursor-pointer select-none"
              style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}
            >
              {currentBuilding.icon}
            </button>
          </div>
          <div className="text-white/80 text-sm">
            Clics totaux: {gameState.totalClicks.toLocaleString('fr-FR')}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">💼 Mes Guillaume</h3>
            <div className="space-y-3">
              {gameState.guillaumes.map((guillaume) => (
                <div key={guillaume.id} className="bg-white/20 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{guillaume.emoji}</span>
                      <div>
                        <div className="text-white font-semibold">{guillaume.name}</div>
                        <div className="text-white/70 text-sm">
                          {guillaume.clicksPerSecond} clics/sec
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">x{guillaume.owned}</div>
                      <div className="text-white/70 text-sm">
                        ₹{guillaume.currentPrice.toLocaleString('fr-FR')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">📊 Statistiques</h3>
            <div className="space-y-3">
              <div className="bg-white/20 rounded-lg p-3">
                <div className="text-white font-semibold">Argent Total Gagné</div>
                <div className="text-white/70 text-sm">
                  ₹{gameState.totalMoneyEarned.toLocaleString('fr-FR')}
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="text-white font-semibold">Tickets Grattés</div>
                <div className="text-white/70 text-sm">
                  {gameState.totalTicketsScratched}
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="text-white font-semibold">Victoires Casino</div>
                <div className="text-white/70 text-sm">
                  {gameState.totalCasinoWins}
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="text-white font-semibold">Monster Collectées</div>
                <div className="text-white/70 text-sm">
                  {gameState.monstersCollection.reduce((sum, m) => sum + m.obtained, 0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}