import React from 'react';
import { GameState } from '../types/game';
import { TICKET_PRICE } from '../utils/scratchLogic';

interface StationServiceProps {
  gameState: GameState;
  onBuyTicket: () => void;
  onBuyGuillaume: (guillaumeId: string) => void;
}

export default function StationService({ 
  gameState, 
  onBuyTicket,
  onBuyGuillaume 
}: StationServiceProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            ⛽ STATION-SERVICE MONSTER ⛽
          </h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div className="text-2xl font-bold text-white">
              ₹ {gameState.rupees.toLocaleString('fr-FR')} Roupies
            </div>
            <div className="text-sm text-white/80">
              Tickets: {gameState.scratchTickets}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Guillaume Shop */}
          <div className="xl:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                👥 GUILLAUME SHOP
              </h2>
              <div className="space-y-4">
                {gameState.guillaumes.map((guillaume) => (
                  <div key={guillaume.id} className="bg-white/20 rounded-lg p-4">
                    <div className="text-center mb-3">
                      <div className="text-4xl mb-2">{guillaume.emoji}</div>
                      <div className="text-white font-bold">{guillaume.name}</div>
                      <div className="text-white/70 text-sm">
                        {guillaume.clicksPerSecond} clics/sec
                      </div>
                      <div className="text-white/70 text-sm">
                        Possédés: {guillaume.owned}
                      </div>
                    </div>
                    <button
                      onClick={() => onBuyGuillaume(guillaume.id)}
                      disabled={gameState.rupees < guillaume.currentPrice}
                      className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 text-black font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      ₹{guillaume.currentPrice.toLocaleString('fr-FR')}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tickets à Gratter */}
          <div className="xl:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                🎫 TICKETS À GRATTER MONSTER
              </h2>
              
              <div className="text-center mb-8">
                <div className="text-8xl mb-4">🎫</div>
                <div className="text-white text-lg mb-4">
                  Achetez des tickets à gratter pour découvrir des Monster Energy !
                </div>
                <div className="bg-white/20 rounded-lg p-4 mb-6">
                  <div className="text-white font-bold text-xl mb-2">
                    Prix: ₹{TICKET_PRICE.toLocaleString('fr-FR')} par ticket
                  </div>
                  <div className="text-white/80 text-sm">
                    Chaque ticket contient une Monster Energy aléatoire !
                  </div>
                </div>
              </div>

              {/* Probabilités */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-500 rounded-lg p-3 text-center">
                  <div className="text-white font-bold">Commun</div>
                  <div className="text-white/80 text-sm">60%</div>
                  <div className="text-white/80 text-xs">x1.5 mult.</div>
                </div>
                <div className="bg-blue-500 rounded-lg p-3 text-center">
                  <div className="text-white font-bold">Rare</div>
                  <div className="text-white/80 text-sm">25%</div>
                  <div className="text-white/80 text-xs">x2 mult.</div>
                </div>
                <div className="bg-purple-500 rounded-lg p-3 text-center">
                  <div className="text-white font-bold">Épique</div>
                  <div className="text-white/80 text-sm">12%</div>
                  <div className="text-white/80 text-xs">x3 mult.</div>
                </div>
                <div className="bg-red-500 rounded-lg p-3 text-center">
                  <div className="text-white font-bold">Monstrueux</div>
                  <div className="text-white/80 text-sm">3%</div>
                  <div className="text-white/80 text-xs">x5-8 mult.</div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={onBuyTicket}
                  disabled={gameState.rupees < TICKET_PRICE}
                  className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 text-black font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-200 disabled:text-white"
                >
                  {gameState.rupees >= TICKET_PRICE 
                    ? `🎫 Acheter un Ticket (₹${TICKET_PRICE.toLocaleString('fr-FR')})` 
                    : '💸 Pas assez de roupies'
                  }
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div className="text-white text-sm">
              💡 Les Monster Energy augmentent la puissance de vos clics temporairement !<br/>
              🤖 Les Guillaume génèrent des clics automatiques !
              🎫 Grattez les tickets pour découvrir des Monster rares !
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}