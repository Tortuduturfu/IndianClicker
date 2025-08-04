import React, { useEffect, useState } from 'react';
import { Achievement } from '../types/game';

interface AchievementNotificationProps {
  achievement: Achievement;
  onClose: () => void;
  soundVolume: number;
}

export default function AchievementNotification({ achievement, onClose, soundVolume }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation d'entrée
    setTimeout(() => setIsVisible(true), 100);
    
    // Son de notification
    playAchievementSound();
    
    // Auto-fermeture après 5 secondes
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const playAchievementSound = () => {
    if (soundVolume === 0) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Mélodie de succès
      const frequencies = [523.25, 659.25, 783.99, 1046.50]; // Do, Mi, Sol, Do aigu
      const duration = 0.15;
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.type = 'triangle';
        
        const volume = (soundVolume / 100) * 0.3;
        gainNode.gain.setValueAtTime(0, audioContext.currentTime + index * duration);
        gainNode.gain.exponentialRampToValueAtTime(volume, audioContext.currentTime + index * duration + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + index * duration + duration);
        
        oscillator.start(audioContext.currentTime + index * duration);
        oscillator.stop(audioContext.currentTime + index * duration + duration);
      });
    } catch (error) {
      console.log('Audio non supporté:', error);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
      }`}>
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 shadow-2xl border-4 border-yellow-300 max-w-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-4xl animate-bounce">
                {achievement.icon}
              </div>
              <div>
                <div className="text-white font-bold text-lg">
                  🏆 SUCCÈS DÉBLOQUÉ !
                </div>
                <div className="text-yellow-100 font-semibold">
                  {achievement.name}
                </div>
                <div className="text-yellow-200 text-sm">
                  {achievement.description}
                </div>
                {achievement.reward && (
                  <div className="text-green-200 font-bold text-sm mt-1">
                    💰 +₹{achievement.reward.toLocaleString('fr-FR')}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-yellow-200 font-bold text-xl leading-none"
            >
              ×
            </button>
          </div>
          
          {/* Particules d'animation */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-ping"
                style={{
                  left: `${20 + (i * 10)}%`,
                  top: `${10 + (i % 3) * 30}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}