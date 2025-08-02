import React, { useState, useEffect } from 'react';
import { GameState, Card, BlackjackHand } from '../../types/game';
import { createDeck, calculateHandValue, getSuitSymbol } from '../../utils/scratchLogic';

interface BlackjackProps {
  gameState: GameState;
  onUpdateRupees: (amount: number) => void;
  onUpdateStats: (stats: Partial<GameState>) => void;
  onBack: () => void;
}

type GamePhase = 'betting' | 'dealing' | 'playing' | 'dealer' | 'finished';

export default function Blackjack({ gameState, onUpdateRupees, onUpdateStats, onBack }: BlackjackProps) {
  const [bet, setBet] = useState(50);
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [phase, setPhase] = useState<GamePhase>('betting');
  const [message, setMessage] = useState('');
  const [deckIndex, setDeckIndex] = useState(0);

  useEffect(() => {
    if (deck.length === 0) {
      setDeck(createDeck());
    }
  }, []);

  const dealCard = (currentDeck: Card[], currentIndex: number): { card: Card; newIndex: number } => {
    if (currentIndex >= currentDeck.length - 1) {
      const newDeck = createDeck();
      return { card: newDeck[0], newIndex: 1 };
    }
    return { card: currentDeck[currentIndex], newIndex: currentIndex + 1 };
  };

  const startGame = () => {
    if (gameState.rupees < bet) {
      setMessage('Pas assez de roupies !');
      return;
    }

    onUpdateRupees(-bet);
    onUpdateStats({ totalCasinoBet: (gameState.totalCasinoBet || 0) + bet });

    let currentDeck = deck.length > 10 ? deck : createDeck();
    let currentIndex = deck.length > 10 ? deckIndex : 0;

    // Deal initial cards
    const { card: playerCard1, newIndex: index1 } = dealCard(currentDeck, currentIndex);
    const { card: dealerCard1, newIndex: index2 } = dealCard(currentDeck, index1);
    const { card: playerCard2, newIndex: index3 } = dealCard(currentDeck, index2);
    const { card: dealerCard2, newIndex: index4 } = dealCard(currentDeck, index3);

    if (index1 === 1) currentDeck = createDeck();

    setDeck(currentDeck);
    setDeckIndex(index4);
    setPlayerHand([playerCard1, playerCard2]);
    setDealerHand([dealerCard1, dealerCard2]);
    setPhase('dealing');
    setMessage('');

    setTimeout(() => {
      const playerValue = calculateHandValue([playerCard1, playerCard2]);
      const dealerValue = calculateHandValue([dealerCard1, dealerCard2]);

      if (playerValue.isBlackjack && dealerValue.isBlackjack) {
        setMessage('Double Blackjack ! Égalité');
        onUpdateRupees(bet);
        setPhase('finished');
      } else if (playerValue.isBlackjack) {
        const winAmount = Math.floor(bet * 2.5);
        setMessage(`🃏 BLACKJACK ! +₹${winAmount}`);
        onUpdateRupees(winAmount);
        onUpdateStats({ 
          totalCasinoWins: gameState.totalCasinoWins + 1,
          blackjackWins: (gameState.blackjackWins || 0) + 1,
          biggestWin: Math.max(gameState.biggestWin || 0, winAmount)
        });
        setPhase('finished');
      } else if (dealerValue.isBlackjack) {
        setMessage('Le croupier a un Blackjack ! Vous perdez');
        onUpdateStats({ totalCasinoLosses: gameState.totalCasinoLosses + 1 });
        setPhase('finished');
      } else {
        setPhase('playing');
      }
    }, 1000);
  };

  const hit = () => {
    const { card, newIndex } = dealCard(deck, deckIndex);
    const newPlayerHand = [...playerHand, card];
    const handValue = calculateHandValue(newPlayerHand);

    setPlayerHand(newPlayerHand);
    setDeckIndex(newIndex);

    if (handValue.isBust) {
      setMessage(`Bust ! Vous avez ${handValue.value} points`);
      onUpdateStats({ totalCasinoLosses: gameState.totalCasinoLosses + 1 });
      setPhase('finished');
    } else if (handValue.value === 21) {
      stand(newPlayerHand);
    }
  };

  const stand = (currentPlayerHand = playerHand) => {
    setPhase('dealer');
    let currentDealerHand = [...dealerHand];
    let currentIndex = deckIndex;

    const dealerPlay = () => {
      const dealerValue = calculateHandValue(currentDealerHand);
      
      if (dealerValue.value < 17) {
        const { card, newIndex } = dealCard(deck, currentIndex);
        currentDealerHand = [...currentDealerHand, card];
        currentIndex = newIndex;
        setDealerHand(currentDealerHand);
        setDeckIndex(currentIndex);
        
        setTimeout(dealerPlay, 1000);
      } else {
        // Determine winner
        const playerValue = calculateHandValue(currentPlayerHand);
        const finalDealerValue = calculateHandValue(currentDealerHand);
        
        if (finalDealerValue.isBust) {
          const winAmount = bet * 2;
          setMessage(`Le croupier bust ! Vous gagnez ₹${winAmount}`);
          onUpdateRupees(winAmount);
          onUpdateStats({ 
            totalCasinoWins: gameState.totalCasinoWins + 1,
            blackjackWins: (gameState.blackjackWins || 0) + 1,
            biggestWin: Math.max(gameState.biggestWin || 0, winAmount)
          });
        } else if (playerValue.value > finalDealerValue.value) {
          const winAmount = bet * 2;
          setMessage(`Vous gagnez ! (${playerValue.value} vs ${finalDealerValue.value}) +₹${winAmount}`);
          onUpdateRupees(winAmount);
          onUpdateStats({ 
            totalCasinoWins: gameState.totalCasinoWins + 1,
            blackjackWins: (gameState.blackjackWins || 0) + 1,
            biggestWin: Math.max(gameState.biggestWin || 0, winAmount)
          });
        } else if (playerValue.value === finalDealerValue.value) {
          setMessage(`Égalité ! (${playerValue.value} vs ${finalDealerValue.value})`);
          onUpdateRupees(bet);
        } else {
          setMessage(`Vous perdez ! (${playerValue.value} vs ${finalDealerValue.value})`);
          onUpdateStats({ totalCasinoLosses: gameState.totalCasinoLosses + 1 });
        }
        
        setPhase('finished');
      }
    };

    setTimeout(dealerPlay, 1000);
  };

  const resetGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setPhase('betting');
    setMessage('');
  };

  const renderCard = (card: Card, hidden = false) => (
    <div className="bg-white rounded-lg p-2 m-1 shadow-lg min-w-[60px] text-center">
      {hidden ? (
        <div className="text-2xl">🂠</div>
      ) : (
        <>
          <div className={`text-lg font-bold ${card.suit === 'hearts' || card.suit === 'diamonds' ? 'text-red-500' : 'text-black'}`}>
            {card.display}
          </div>
          <div className="text-xl">
            {getSuitSymbol(card.suit)}
          </div>
        </>
      )}
    </div>
  );

  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-600 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            ← Retour
          </button>
          <h1 className="text-4xl font-bold text-white">🃏 BLACKJACK</h1>
          <div className="bg-black/50 rounded-lg p-3">
            <div className="text-white font-bold">₹{gameState.rupees.toLocaleString('fr-FR')}</div>
          </div>
        </div>

        {/* Dealer */}
        <div className="bg-black/30 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Croupier</h2>
          <div className="flex justify-center mb-4">
            {dealerHand.map((card, index) => (
              <div key={index}>
                {renderCard(card, phase === 'playing' && index === 1)}
              </div>
            ))}
          </div>
          <div className="text-center text-white text-xl">
            {phase === 'playing' ? 
              `Points: ${calculateHandValue([dealerHand[0]]).value}+?` :
              `Points: ${dealerValue.value}`
            }
          </div>
        </div>

        {/* Player */}
        <div className="bg-black/30 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Vous</h2>
          <div className="flex justify-center mb-4">
            {playerHand.map((card, index) => (
              <div key={index}>
                {renderCard(card)}
              </div>
            ))}
          </div>
          <div className="text-center text-white text-xl">
            Points: {playerValue.value}
            {playerValue.isBlackjack && ' (BLACKJACK!)'}
            {playerValue.isBust && ' (BUST!)'}
          </div>
        </div>

        {/* Controls */}
        <div className="text-center">
          {phase === 'betting' && (
            <div className="space-y-4">
              <div>
                <label className="block text-white font-bold mb-2">Mise:</label>
                <input
                  type="number"
                  value={bet}
                  onChange={(e) => setBet(Math.max(10, parseInt(e.target.value) || 10))}
                  className="p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border-2 border-yellow-400"
                  min="10"
                  max={gameState.rupees}
                />
              </div>
              <button
                onClick={startGame}
                disabled={gameState.rupees < bet}
                className="bg-yellow-400 hover:bg-yellow-300 disabled:bg-gray-600 text-black font-bold py-4 px-8 rounded-lg text-xl"
              >
                Distribuer les cartes
              </button>
            </div>
          )}

          {phase === 'playing' && (
            <div className="space-x-4">
              <button
                onClick={hit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg"
              >
                Tirer une carte
              </button>
              <button
                onClick={() => stand()}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg"
              >
                Rester
              </button>
            </div>
          )}

          {phase === 'finished' && (
            <button
              onClick={resetGame}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl"
            >
              Nouvelle partie
            </button>
          )}

          {message && (
            <div className="mt-6 bg-black/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">{message}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}