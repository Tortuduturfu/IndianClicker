import React, { useState } from 'react';
import { Achievement } from '../types/game';

interface AchievementsProps {
  achievements: Achievement[];
}

export default function Achievements({ achievements }: AchievementsProps) {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked' | 'hidden'>('all');

  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const lockedAchievements = achievements.filter(a => !a.isUnlocked && !a.isHidden);
  const hiddenAchievements = achievements.filter(a => !a.isUnlocked && a.isHidden);
  const visibleAchievements = achievements.filter(a => !a.isHidden);

  const filteredAchievements = () => {
    switch (filter) {
      case 'unlocked':
        return unlockedAchievements;
      case 'locked':
        return lockedAchievements;
      case 'hidden':
        return achievements.filter(a => a.isHidden);
      default:
        return visibleAchievements;
    }
  };

  const completionRate = Math.round((unlockedAchievements.length / achievements.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🏆 SUCCÈS & ACHIEVEMENTS 🏆
          </h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 inline-block">
            <div className="text-3xl font-bold text-white mb-2">
              {unlockedAchievements.length} / {achievements.length} Succès
            </div>
            <div className="text-xl text-white/90">
              Complétion: {completionRate}%
            </div>
            <div className="w-64 bg-white/30 rounded-full h-4 mt-2">
              <div 
                className="bg-yellow-400 h-4 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-green-500 rounded-lg p-4 text-center">
            <div className="text-white font-bold text-lg">Débloqués</div>
            <div className="text-white text-2xl font-bold">{unlockedAchievements.length}</div>
          </div>
          <div className="bg-gray-500 rounded-lg p-4 text-center">
            <div className="text-white font-bold text-lg">Verrouillés</div>
            <div className="text-white text-2xl font-bold">{lockedAchievements.length}</div>
          </div>
          <div className="bg-purple-500 rounded-lg p-4 text-center">
            <div className="text-white font-bold text-lg">Cachés</div>
            <div className="text-white text-2xl font-bold">{hiddenAchievements.length}</div>
          </div>
          <div className="bg-yellow-500 rounded-lg p-4 text-center">
            <div className="text-white font-bold text-lg">Total</div>
            <div className="text-white text-2xl font-bold">{achievements.length}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 flex space-x-2">
            {[
              { key: 'all', label: 'Tous Visibles' },
              { key: 'unlocked', label: 'Débloqués' },
              { key: 'locked', label: 'Verrouillés' },
              { key: 'hidden', label: 'Cachés' }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={`px-4 py-2 rounded-lg font-bold transition-colors duration-200 ${
                  filter === filterOption.key
                    ? 'bg-white text-orange-600'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAchievements().map((achievement) => (
            <div
              key={achievement.id}
              className={`rounded-lg p-4 border-2 transition-all duration-200 ${
                achievement.isUnlocked
                  ? 'bg-green-500/20 border-green-400 hover:bg-green-500/30'
                  : achievement.isHidden
                  ? 'bg-purple-500/20 border-purple-400 hover:bg-purple-500/30'
                  : 'bg-gray-500/20 border-gray-400 hover:bg-gray-500/30'
              }`}
            >
              <div className="text-center">
                <div className={`text-4xl mb-2 ${!achievement.isUnlocked && achievement.isHidden ? 'grayscale' : ''}`}>
                  {achievement.isUnlocked || !achievement.isHidden ? achievement.icon : '❓'}
                </div>
                <div className="text-white font-bold text-sm mb-1">
                  {achievement.isUnlocked || !achievement.isHidden ? achievement.name : '???'}
                </div>
                <div className="text-white/80 text-xs mb-2">
                  {achievement.isUnlocked || !achievement.isHidden ? achievement.description : 'Succès caché'}
                </div>
                
                {achievement.reward && (
                  <div className="text-yellow-400 font-bold text-xs">
                    Récompense: ₹{achievement.reward}
                  </div>
                )}
                
                <div className={`text-xs px-2 py-1 rounded-full mt-2 ${
                  achievement.isUnlocked
                    ? 'bg-green-500 text-white'
                    : achievement.isHidden
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-500 text-white'
                }`}>
                  {achievement.isUnlocked ? 'DÉBLOQUÉ' : achievement.isHidden ? 'CACHÉ' : 'VERROUILLÉ'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAchievements().length === 0 && (
          <div className="text-center mt-12">
            <div className="text-white/70 text-xl">
              Aucun succès dans cette catégorie
            </div>
          </div>
        )}
      </div>
    </div>
  );
}