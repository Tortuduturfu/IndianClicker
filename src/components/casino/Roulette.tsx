import React, { useState } from 'react';
import { GameState } from '../../types/game';

interface RouletteProps {
  gameState: GameState;
  onUpdateRupees: (amount: number) => void;
  onUpdateStats: (stats: Partial<GameState>) => void;
  onBack: () => void;
}

type BetType = 'number' | 'red' | 'black' | 'even' | 'odd' | 'low' | 'high';

interface Bet {
  type: BetType;
  value?: number;
  amount: number;
  payout: number;
}

const rouletteNumbers = [
  { number: 0, color: 'green' },
  { number: 1, color: 'red' }, { number: 2, color: 'black' }, { number: 3, color: 'red' },
  { number: 4, color: 'black' }, { number: 5, color: 'red' }, { number: 6, color: 'black' },
  { number: 7, color: 'red' }, { number: 8, color: 'black' }, { number: 9, color: 'red' },
  { number: 10, color: 'black' }, { number: 11, color: 'black' }, { number: 12, color: 'red' },
  { number: 13, color: 'black' }, { number: 14, color: 'red' }, { number: 15, color: 'black' },
  { number: 16, color: 'red' }, { number: 17, color: 'black' }, { number: 18, color: 'red' },
  { number: 19, color: 'red' }, { number: 20, color: 'black' }, { number: 21, color: 'red' },
  { number: 22, color: 'black' }, { number: 23, color: 'red' }, { number: 24, color: 'black' },
  { number: 25, color: 'red' }, { number: 26, color: 'black' }, { number: 27, color: 'red' },
  { number: 28, color: 'black' }, { number: 29, color: 'black' }, { number: 30, color: 'red' },
  { number: 31, color: 'black' }, { number: 32, color: 'red' }, { number: 33, color: 'black' },
  { number: 34, color: 'red' }, { number: 35, color: 'black' }, { number: 36, color: 'red' }
];

export default function Roulette({ gameState, onUpdateRupees, onUpdateStats, onBack }: RouletteProps) {
  const [bets, setBets] = useState<Bet[]>([]);
  const [betAmount, setBetAmount] = useState(25);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [result, setResult] = useState('');

  const addBet = (type: BetType, value?: number) => {
    if (gameState.rupees < betAmount) {
      setResult('Pas assez de roupies !');
      return;
    }

    let payout = 1;
    switch (type) {
      case 'number': payout = 35; break;
      case 'red':
      case 'black':
      case 'even':
      case 'odd':
      case 'low':
      case 'high': payout = 1; break;
    }

    const newBet: Bet = { type, value, amount: betAmount, payout };
    setBets([...bets, newBet]);
    onUpdateRupees(-betAmount);
    onUpdateStats({ totalCasinoBet: (gameState.totalCasinoBet || 0) + betAmount });
    setResult('');
  };

  const clearBets = () => {
    const totalBetAmount = bets.reduce((sum, bet) => sum + bet.amount, 0);
    onUpdateRupees(totalBetAmount);
    onUpdateStats({ totalCasinoBet: (gameState.totalCasinoBet || 0) - totalBetAmount });
    setBets([]);
    setResult('');
  };

  const spin = () => {
    if (bets.length === 0) {
      setResult('Placez au moins une mise !');
      return;
    }

    setIsSpinning(true);
    setResult('La roulette tourne...');

    setTimeout(() => {
      const winning = Math.floor(Math.random() * 37);
      const winningData = rouletteNumbers.find(n => n.number === winning)!;
      setWinningNumber(winning);

      let totalWin = 0;
      let winningBets = 0;

      bets.forEach(bet => {
        let isWin = false;

        switch (bet.type) {
          case 'number':
            isWin = bet.value === winning;
            break;
          case 'red':
            isWin = winningData.color === 'red';
            break;
          case 'black':
            isWin = winningData.color === 'black';
            break;
          case 'even':
            isWin = winning !== 0 && winning % 2 === 0;
            break;
          case 'odd':
            isWin = winning !== 0 && winning % 2 === 1;
            break;
          case 'low':
            isWin = winning >= 1 && winning <= 18;
            break;
          case 'high':
            isWin = winning >= 19 && winning <= 36;
            break;
        }

        if (isWin) {
          totalWin += bet.amount * (bet.payout + 1);
          winningBets++;
        }
      });

      if (totalWin > 0) {
        onUpdateRupees(totalWin);
        onUpdateStats({ 
          totalCasinoWins: gameState.totalCasinoWins + 1,
          rouletteWins: (gameState.rouletteWins || 0) + 1,
          biggestWin: Math.max(gameState.biggestWin || 0, totalWin)
        });
        setResult(`🎉 Numéro ${winning} (${winningData.color}) ! Vous gagnez ₹${totalWin} sur ${winningBets} mise(s) !`);
      } else {
        onUpdateStats({ totalCasinoLosses: gameState.totalCasinoLosses + 1 });
        setResult(`💔 Numéro ${winning} (${winningData.color}). Vous perdez toutes vos mises.`);
      }

      setBets([]);
      setIsSpinning(false);
    }, 3000);
  };

  const getBetTypeLabel = (bet: Bet) => {
    switch (bet.type) {
      case 'number': return `N°${bet.value}`;
      case 'red': return 'Rouge';
      case 'black': return 'Noir';
      case 'even': return 'Pair';
      case 'odd': return 'Impair';
      case 'low': return '1-18';
      case 'high': return '19-36';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-800 to-red-600 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg"
          >
            ← Retour
          </button>
          <h1 className="text-4xl font-bold text-white">🎯 ROULETTE</h1>
          <div className="bg-black/50 rounded-lg p-3">
            <div className="text-white font-bold">₹{gameState.rupees.toLocaleString('fr-FR')}</div>
          </div>
        </div>

        {/* Roulette Wheel */}
        <div className="text-center mb-8">
          <div className={`text-8xl mb-4 ${isSpinning ? 'animate-spin' : ''}`}>
            🎯
          </div>
          {winningNumber !== null && (
            <div className="bg-black/50 rounded-lg p-4 inline-block">
              <div className="text-3xl font-bold text-white">
                Numéro gagnant: {winningNumber}
              </div>
              <div className={`text-xl ${rouletteNumbers.find(n => n.number === winningNumber)?.color === 'red' ? 'text-red-400' : 
                rouletteNumbers.find(n => n.number === winningNumber)?.color === 'black' ? 'text-gray-300' : 'text-green-400'}`}>
                {rouletteNumbers.find(n => n.number === winningNumber)?.color.toUpperCase()}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Betting Options */}
          <div className="bg-black/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Options de Mise</h2>
            
            <div className="mb-4">
              <label className="block text-white font-bold mb-2">Montant de la mise:</label>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(Math.max(5, parseInt(e.target.value) || 5))}
                className="w-full p-3 rounded-lg bg-white/20 text-white border-2 border-yellow-400"
                min="5"
                max={gameState.rupees}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => addBet('red')}
                disabled={isSpinning}
                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg"
              >
                Rouge (x2)
              </button>
              <button
                onClick={() => addBet('black')}
                disabled={isSpinning}
                className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg"
              >
                Noir (x2)
              </button>
              <button
                onClick={() => addBet('even')}
                disabled={isSpinning}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg"
              >
                Pair (x2)
              </button>
              <button
                onClick={() => addBet('odd')}
                disabled={isSpinning}
                className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg"
              >
                Impair (x2)
              </button>
              <button
                onClick={() => addBet('low')}
                disabled={isSpinning}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg"
              >
                1-18 (x2)
              </button>
              <button
                onClick={() => addBet('high')}
                disabled={isSpinning}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg"
              >
                19-36 (x2)
              </button>
            </div>

            {/* Number Grid */}
            <div className="mb-4">
              <h3 className="text-white font-bold mb-2">Numéros (x36):</h3>
              <div className="grid grid-cols-6 gap-1 max-h-40 overflow-y-auto">
                {rouletteNumbers.slice(1).map(({ number, color }) => (
                  <button
                    key={number}
                    onClick={() => addBet('number', number)}
                    disabled={isSpinning}
                    className={`p-2 text-white font-bold text-sm rounded ${
                      color === 'red' ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-800 hover:bg-gray-700'
                    } disabled:bg-gray-600`}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Current Bets & Controls */}
          <div className="bg-black/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Vos Mises</h2>
            
            {bets.length === 0 ? (
              <div className="text-white/70 text-center py-8">
                Aucune mise placée
              </div>
            ) : (
              <div className="space-y-2 mb-6 max-h-40 overflow-y-auto">
                {bets.map((bet, index) => (
                  <div key={index} className="bg-white/20 rounded-lg p-3 flex justify-between">
                    <span className="text-white font-bold">
                      {getBetTypeLabel(bet)}
                    </span>
                    <span className="text-yellow-400 font-bold">
                      ₹{bet.amount} (x{bet.payout + 1})
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4">
              <div className="text-white text-center">
                Total misé: ₹{bets.reduce((sum, bet) => sum + bet.amount, 0)}
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={spin}
                  disabled={isSpinning || bets.length === 0}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-300 disabled:bg-gray-600 text-black font-bold py-4 px-6 rounded-lg text-xl"
                >
                  {isSpinning ? '🎯 Rotation...' : '🚀 LANCER !'}
                </button>
                <button
                  onClick={clearBets}
                  disabled={isSpinning || bets.length === 0}
                  className="bg-red-500 hover:bg-red-600 disabled:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg"
                >
                  Effacer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-8 text-center">
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