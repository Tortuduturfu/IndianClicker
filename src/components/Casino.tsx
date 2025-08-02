import React, { useState } from 'react';
import { GameState } from '../types/game';
import Blackjack from './casino/Blackjack';
import Roulette from './casino/Roulette';
import SlotMachine from './casino/SlotMachine';

interface CasinoProps {
  gameState: GameState;
  onUpdateRupees: (amount: number) => void;
  onUpdateStats: (stats: Partial<GameState>) => void;
}

type CasinoGame = 'lobby' | 'blackjack' | 'roulette' | 'slots';

export default function Casino({ gameState, onUpdateRupees, onUpdateStats }: CasinoProps) {
  const [currentGame, setCurrentGame] = useState<CasinoGame>('lobby');

  const renderGame = () => {
    switch (currentGame) {
      case 'blackjack':
        return (
          <Blackjack
            gameState={gameState}
            onUpdateRupees={onUpdateRupees}
            onUpdateStats={onUpdateStats}
            onBack={() => setCurrentGame('lobby')}
          />
        );
      case 'roulette':
        return (
          <Roulette
            gameState={gameState}
            onUpdateRupees={onUpdateRupees}
            onUpdateStats={onUpdateStats}
            onBack={() => setCurrentGame('lobby')}
          />
        );
      case 'slots':
        return (
          <SlotMachine
            gameState={gameState}
            onUpdateRupees={onUpdateRupees}
            onUpdateStats={onUpdateStats}
            onBack={() => setCurrentGame('lobby')}
          />
        );
      default:
        return renderLobby();
    }
  };

  const renderLobby = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-red-900 to-yellow-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-yellow-400 mb-4">
            🎰 CASINO ROYAL 🎰
          </h1>
          <div className="flex justify-center space-x-8 mb-6">
            <div className="text-6xl animate-pulse">🎲</div>
            <div className="text-6xl animate-bounce">💎</div>
            <div className="text-6xl animate-pulse">🍀</div>
          </div>
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 inline-block">
            <div className="text-4xl font-bold text-yellow-400 mb-2">
              ₹ {gameState.rupees.toLocaleString('fr-FR')} Roupies
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-white/80">
              <div>Victoires Casino: {gameState.totalCasinoWins}</div>
              <div>Défaites Casino: {gameState.totalCasinoLosses}</div>
              <div>Plus Gros Gain: ₹{gameState.biggestWin?.toLocaleString('fr-FR') || 0}</div>
              <div>Total Misé: ₹{gameState.totalCasinoBet?.toLocaleString('fr-FR') || 0}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blackjack */}
          <div className="bg-gradient-to-br from-green-800 to-green-600 rounded-xl p-6 border-4 border-yellow-400 hover:scale-105 transition-transform cursor-pointer"
               onClick={() => setCurrentGame('blackjack')}>
            <div className="text-center">
              <div className="text-6xl mb-4">🃏</div>
              <h2 className="text-3xl font-bold text-white mb-4">BLACKJACK</h2>
              <div className="text-white/90 mb-4">
                Battez le croupier !<br/>
                Objectif: 21 points
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="text-yellow-400 font-bold">
                  Gains: x2 | Blackjack: x2.5
                </div>
              </div>
            </div>
          </div>

          {/* Roulette */}
          <div className="bg-gradient-to-br from-red-800 to-red-600 rounded-xl p-6 border-4 border-yellow-400 hover:scale-105 transition-transform cursor-pointer"
               onClick={() => setCurrentGame('roulette')}>
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-3xl font-bold text-white mb-4">ROULETTE</h2>
              <div className="text-white/90 mb-4">
                Misez sur les numéros !<br/>
                Rouge, Noir, Pair, Impair
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="text-yellow-400 font-bold">
                  Gains: x2 à x36
                </div>
              </div>
            </div>
          </div>

          {/* Slot Machine */}
          <div className="bg-gradient-to-br from-blue-800 to-blue-600 rounded-xl p-6 border-4 border-yellow-400 hover:scale-105 transition-transform cursor-pointer"
               onClick={() => setCurrentGame('slots')}>
            <div className="text-center">
              <div className="text-6xl mb-4">🎰</div>
              <h2 className="text-3xl font-bold text-white mb-4">MACHINES</h2>
              <div className="text-white/90 mb-4">
                3 symboles identiques !<br/>
                Jackpot possible
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="text-yellow-400 font-bold">
                  Gains: x5 à x1000
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ambiance Casino */}
        <div className="mt-12 text-center">
          <div className="flex justify-center space-x-4 text-6xl mb-4">
            <div className="animate-pulse">🎰</div>
            <div className="animate-bounce">💰</div>
            <div className="animate-pulse">🎲</div>
            <div className="animate-bounce">🃏</div>
            <div className="animate-pulse">💎</div>
          </div>
          <div className="text-yellow-400 text-2xl font-bold">
            ✨ BIENVENUE AU CASINO ROYAL ✨
          </div>
          <div className="text-white/80 mt-2">
            Choisissez votre jeu et tentez votre chance !
          </div>
        </div>
      </div>
    </div>
  );

  return renderGame();
}