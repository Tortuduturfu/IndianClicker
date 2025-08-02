import React, { useState } from 'react';
import { Monster } from '../types/game';

interface CollectionProps {
  monstersCollection: Monster[];
}

const rarityColors = {
  commun: 'bg-gray-500',
  rare: 'bg-blue-500',
  épique: 'bg-purple-500',
  monstrueux: 'bg-red-500'
};

const rarityBorders = {
  commun: 'border-gray-400',
  rare: 'border-blue-400',
  épique: 'border-purple-400',
  monstrueux: 'border-red-400'
};

export default function Collection({ monstersCollection }: CollectionProps) {
  const [filter, setFilter] = useState<'all' | 'commun' | 'rare' | 'épique' | 'monstrueux'>('all');

  const filteredMonsters = filter === 'all' 
    ? monstersCollection 
    : monstersCollection.filter(m => m.rarity === filter);

  const obtainedMonsters = monstersCollection.filter(m => m.obtained > 0);
  const totalMonsters = monstersCollection.length;
  const completionRate = Math.round((obtainedMonsters.length / totalMonsters) * 100);

  const getRarityStats = (rarity: 'commun' | 'rare' | 'épique' | 'monstrueux') => {
    const total = monstersCollection.filter(m => m.rarity === rarity).length;
    const obtained = monstersCollection.filter(m => m.rarity === rarity && m.obtained > 0).length;
    return { total, obtained };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            📚 MA COLLECTION MONSTER 📚
          </h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 inline-block">
            <div className="text-3xl font-bold text-white mb-2">
              {obtainedMonsters.length} / {totalMonsters} Monster
            </div>
            <div className="text-xl text-white/90">
              Complétion: {completionRate}%
            </div>
            <div className="w-64 bg-white/30 rounded-full h-4 mt-2">
              <div 
                className="bg-green-400 h-4 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Statistiques par rareté */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {(['commun', 'rare', 'épique', 'monstrueux'] as const).map((rarity) => {
            const stats = getRarityStats(rarity);
            return (
              <div key={rarity} className={`${rarityColors[rarity]} rounded-lg p-4 text-center`}>
                <div className="text-white font-bold capitalize text-lg">{rarity}</div>
                <div className="text-white text-2xl font-bold">
                  {stats.obtained} / {stats.total}
                </div>
                <div className="text-white/80 text-sm">
                  {Math.round((stats.obtained / stats.total) * 100)}%
                </div>
              </div>
            );
          })}
        </div>

        {/* Filtres */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 flex space-x-2">
            {(['all', 'commun', 'rare', 'épique', 'monstrueux'] as const).map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-lg font-bold transition-colors duration-200 ${
                  filter === filterOption
                    ? 'bg-white text-purple-600'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {filterOption === 'all' ? 'Tous' : filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredMonsters.map((monster) => (
            <div
              key={monster.id}
              className={`rounded-lg p-4 border-2 ${rarityBorders[monster.rarity]} transition-all duration-200 ${
                monster.obtained > 0
                  ? 'bg-white/20 hover:bg-white/30'
                  : 'bg-black/50 opacity-50'
              }`}
            >
              <div className="text-center">
                <div className={`text-4xl mb-2 ${monster.obtained === 0 ? 'grayscale' : ''}`}>
                  {monster.obtained > 0 ? monster.image : '❓'}
                </div>
                <div className="text-white font-bold text-sm mb-1">
                  {monster.obtained > 0 ? monster.name : '???'}
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${rarityColors[monster.rarity]} text-white mb-2`}>
                  {monster.rarity.toUpperCase()}
                </div>
                
                {monster.obtained > 0 ? (
                  <>
                    <div className="text-white/80 text-xs mb-1">
                      Multiplicateur: x{monster.multiplier}
                    </div>
                    <div className="text-white font-bold text-sm">
                      Obtenus: {monster.obtained}
                    </div>
                  </>
                ) : (
                  <div className="text-white/60 text-xs">
                    Non découvert
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredMonsters.length === 0 && (
          <div className="text-center mt-12">
            <div className="text-white/70 text-xl">
              Aucune Monster dans cette catégorie
            </div>
          </div>
        )}
      </div>
    </div>
  );
}