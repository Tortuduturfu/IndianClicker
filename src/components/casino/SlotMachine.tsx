import React, { useState } from 'react';
import { GameState } from '../../types/game';

interface SlotMachineProps {
  gameState: GameState;
  onUpdateRupees: (amount: number) => void;
  onUpdateStats: (stats: Partial<GameState>) => void;
  onBack: () => void;
}

const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '7️⃣'];
const payouts = {
  '🍒': 5,
  '🍋': 10,
  '🍊': 15,
  '🍇': 25,
  '⭐': 50,
  '💎': 100,
  '7️⃣': 1000
};

export default function SlotMachine({ gameState, onUpdateRupees, onUpdateStats, onBack }: SlotMachineProps) {
  const [bet, setBet] = useState(20);
  const [reels, setReels] = useState(['🍒', '🍒', '🍒']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState('');
  const [spinCount, setSpinCount] = useState(0);

  const spin = () => {
    if (gameState.rupees < bet) {
      setResult('Pas assez de roupies !');
      return;
    }

    onUpdateRupees(-bet);
    onUpdateStats({ totalCasinoBet: (gameState.totalCasinoBet || 0) + bet });
    setIsSpinning(true);
    setResult('');

    // Animation des rouleaux
    const spinInterval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(spinInterval);
      
      // Résultat final
      const finalReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ];
      
      setReels(finalReels);
      setIsSpinning(false);
      setSpinCount(prev => prev + 1);

      // Vérifier les gains
      if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
        // Trois symboles identiques
        const symbol = finalReels[0] as keyof typeof payouts;
        const multiplier = payouts[symbol];
        const winAmount = bet * multiplier;
        
        if (symbol === '7️⃣') {
          setResult(`🎰 JACKPOT ! 🎰 Trois ${symbol} ! +₹${winAmount}`);
        } else {
          setResult(`🎉 Trois ${symbol} ! +₹${winAmount}`);
        }
        
        onUpdateRupees(winAmount);
        onUpdateStats({ 
          totalCasinoWins: gameState.totalCasinoWins + 1,
          slotWins: (gameState.slotWins || 0) + 1,
          biggestWin: Math.max(gameState.biggestWin || 0, winAmount)
        });
      } else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2] || finalReels[0] === finalReels[2]) {
        // Deux symboles identiques
        const winAmount = Math.floor(bet * 0.5);
        setResult(`🎯 Deux symboles ! +₹${winAmount}`);
        onUpdateRupees(winAmount);
        onUpdateStats({ 
          totalCasinoWins: gameState.totalCasinoWins + 1,
          slotWins: (gameState.slotWins || 0) + 1,
          biggestWin: Math.max(gameState.biggestWin || 0, winAmount)
        });
      } else {
        setResult(`💔 Aucune combinaison gagnante`);
        onUpdateStats({ totalCasinoLosses: gameState.totalCasinoLosses + 1 });
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-blue-600 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            ← Retour
          </button>
          <h1 className="text-4xl font-bold text-white">🎰 MACHINE À SOUS</h1>
          <div className="bg-black/50 rounded-lg p-3">
            <div className="text-white font-bold">₹{gameState.rupees.toLocaleString('fr-FR')}</div>
          </div>
        </div>

        {/* Slot Machine */}
        <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-xl p-8 mb-8 border-8 border-yellow-300">
          <div className="bg-black rounded-lg p-6 mb-6">
            <div className="flex justify-center space-x-4 mb-4">
              {reels.map((symbol, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-lg p-4 text-6xl text-center min-w-[100px] min-h-[100px] flex items-center justify-center ${
                    isSpinning ? 'animate-pulse' : ''
                  }`}
                >
                  {symbol}
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <div className="text-yellow-400 text-2xl font-bold mb-2">
                🎰 CASINO ROYAL 🎰
              </div>
              <div className="text-white text-lg">
                Spins: {spinCount}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="text-center space-y-4">
            <div>
              <label className="block text-black font-bold mb-2">Mise par spin:</label>
              <input
                type="number"
                value={bet}
                onChange={(e) => setBet(Math.max(5, parseInt(e.target.value) || 5))}
                className="p-3 rounded-lg bg-white border-2 border-black text-black font-bold text-center"
                min="5"
                max={gameState.rupees}
                disabled={isSpinning}
              />
            </div>
            
            <button
              onClick={spin}
              disabled={isSpinning || gameState.rupees < bet}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg text-2xl border-4 border-red-300"
            >
              {isSpinning ? '🎰 SPINNING...' : '🎯 SPIN !'}
            </button>
          </div>
        </div>

        {/* Paytable */}
        <div className="bg-black/30 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">💰 TABLE DES GAINS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(payouts).map(([symbol, multiplier]) => (
              <div key={symbol} className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-3xl mb-2">{symbol}</div>
                <div className="text-white font-bold">x{multiplier}</div>
                <div className="text-white/80 text-sm">
                  3 identiques
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center text-white/80 text-sm">
            2 symboles identiques = x0.5 | 3 symboles identiques = multiplicateur complet
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="text-center">
            <div className="bg-black/70 backdrop-blur-sm rounded-xl p-6 inline-block border-4 border-yellow-400">
              <div className="text-2xl font-bold text-white">
                {result}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}