import React, { useEffect, useState } from 'react';
import { Achievement } from '../types/game';

interface AchievementNotificationProps {
  achievement: Achievement;
  onClose: () => void;
  soundVolume: number;
}

export default function AchievementNotification({ achievement, onClose, soundVolume }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    // Générer les particules d'animation
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);

    // Animation d'entrée
    const showTimer = setTimeout(() => setIsVisible(true), 100);
    
    // Son de notification
    playAchievementSound();
    
    // Auto-fermeture après 6 secondes
    const closeTimer = setTimeout(() => {
      handleClose();
    }, 6000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  const playAchievementSound = async () => {
    if (soundVolume === 0) return;
    
    try {
      // Vérifier si AudioContext est disponible
      if (typeof window === 'undefined' || !window.AudioContext && !(window as any).webkitAudioContext) {
        console.log('AudioContext non supporté');
        return;
      }

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Reprendre le contexte audio si nécessaire (politique des navigateurs)
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      
      // Mélodie de succès améliorée - gamme majeure ascendante
      const melody = [
        { freq: 523.25, duration: 0.2 }, // Do
        { freq: 659.25, duration: 0.2 }, // Mi
        { freq: 783.99, duration: 0.2 }, // Sol
        { freq: 1046.50, duration: 0.4 }, // Do aigu (plus long)
        { freq: 1318.51, duration: 0.3 }, // Mi aigu
      ];
      
      const baseVolume = (soundVolume / 100) * 0.25; // Volume de base plus doux
      let currentTime = audioContext.currentTime + 0.1; // Petit délai initial
      
      melody.forEach((note, index) => {
        // Oscillateur principal
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // Oscillateur harmonique pour un son plus riche
        const harmonic = audioContext.createOscillator();
        const harmonicGain = audioContext.createGain();
        
        // Connexions
        oscillator.connect(gainNode);
        harmonic.connect(harmonicGain);
        gainNode.connect(audioContext.destination);
        harmonicGain.connect(audioContext.destination);
        
        // Configuration du son principal
        oscillator.frequency.setValueAtTime(note.freq, currentTime);
        oscillator.type = 'triangle'; // Son doux
        
        // Configuration de l'harmonique (octave supérieure, volume réduit)
        harmonic.frequency.setValueAtTime(note.freq * 2, currentTime);
        harmonic.type = 'sine';
        
        // Enveloppe sonore (ADSR simplifié)
        const attackTime = 0.05;
        const decayTime = 0.1;
        const sustainLevel = baseVolume * 0.7;
        const releaseTime = 0.15;
        
        // Volume principal
        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(baseVolume, currentTime + attackTime);
        gainNode.gain.linearRampToValueAtTime(sustainLevel, currentTime + attackTime + decayTime);
        gainNode.gain.setValueAtTime(sustainLevel, currentTime + note.duration - releaseTime);
        gainNode.gain.linearRampToValueAtTime(0, currentTime + note.duration);
        
        // Volume harmonique (plus faible)
        const harmonicVolume = baseVolume * 0.3;
        harmonicGain.gain.setValueAtTime(0, currentTime);
        harmonicGain.gain.linearRampToValueAtTime(harmonicVolume, currentTime + attackTime);
        harmonicGain.gain.linearRampToValueAtTime(harmonicVolume * 0.5, currentTime + note.duration - releaseTime);
        harmonicGain.gain.linearRampToValueAtTime(0, currentTime + note.duration);
        
        // Démarrage et arrêt
        oscillator.start(currentTime);
        oscillator.stop(currentTime + note.duration);
        harmonic.start(currentTime);
        harmonic.stop(currentTime + note.duration);
        
        currentTime += note.duration * 0.8; // Léger chevauchement entre les notes
      });
      
      // Effet de réverbération simple avec un délai
      setTimeout(() => {
        if (audioContext.state !== 'closed') {
          const echoOscillator = audioContext.createOscillator();
          const echoGain = audioContext.createGain();
          
          echoOscillator.connect(echoGain);
          echoGain.connect(audioContext.destination);
          
          echoOscillator.frequency.setValueAtTime(1046.50, audioContext.currentTime);
          echoOscillator.type = 'sine';
          
          const echoVolume = baseVolume * 0.3;
          echoGain.gain.setValueAtTime(0, audioContext.currentTime);
          echoGain.gain.linearRampToValueAtTime(echoVolume, audioContext.currentTime + 0.02);
          echoGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
          
          echoOscillator.start(audioContext.currentTime);
          echoOscillator.stop(audioContext.currentTime + 0.5);
        }
      }, 300);
      
    } catch (error) {
      console.log('Erreur audio:', error);
      // Fallback avec un son plus simple si l'API avancée échoue
      try {
        const simpleContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = simpleContext.createOscillator();
        const gain = simpleContext.createGain();
        
        osc.connect(gain);
        gain.connect(simpleContext.destination);
        
        osc.frequency.value = 800;
        osc.type = 'triangle';
        gain.gain.value = (soundVolume / 100) * 0.2;
        
        osc.start();
        osc.stop(simpleContext.currentTime + 0.3);
      } catch (fallbackError) {
        console.log('Son de notification indisponible');
      }
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  // Protection contre les valeurs undefined
  const safeAchievement = {
    icon: achievement?.icon || '🏆',
    name: achievement?.name || 'Succès débloqué',
    description: achievement?.description || 'Félicitations !',
    reward: achievement?.reward || 0
  };

  return (
    <div className="fixed top-4 right-4 pointer-events-none" style={{ zIndex: 9999 }}>
      <div className={`transform transition-all duration-500 ease-out ${
        isVisible 
          ? 'translate-x-0 opacity-100 scale-100 rotate-0' 
          : 'translate-x-full opacity-0 scale-75 rotate-12'
      }`}>
        <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-5 shadow-2xl border-4 border-yellow-300 max-w-sm relative overflow-hidden pointer-events-auto" style={{ zIndex: 10000 }}>
          
          {/* Effet de brillance animé */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"></div>
          
          {/* Contenu principal */}
          <div className="relative" style={{ zIndex: 10001 }}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-4">
                <div className="text-5xl animate-bounce drop-shadow-lg">
                  {safeAchievement.icon}
                </div>
                <div>
                  <div className="text-white font-bold text-xl drop-shadow-md">
                    🏆 SUCCÈS DÉBLOQUÉ !
                  </div>
                  <div className="text-yellow-100 font-semibold text-lg drop-shadow-sm">
                    {safeAchievement.name}
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-white hover:text-yellow-200 font-bold text-2xl leading-none transition-colors duration-200 hover:scale-110 transform"
                aria-label="Fermer la notification"
              >
                ×
              </button>
            </div>
            
            <div className="text-yellow-100 text-sm mb-2 drop-shadow-sm">
              {safeAchievement.description}
            </div>
            
            {safeAchievement.reward > 0 && (
              <div className="bg-green-500/20 border border-green-400 rounded-lg p-2 mt-2">
                <div className="text-green-200 font-bold text-center">
                  💰 Récompense: +₹{safeAchievement.reward.toLocaleString('fr-FR')}
                </div>
              </div>
            )}
          </div>
          
          {/* Particules d'animation améliorées */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute w-3 h-3 bg-yellow-300 rounded-full animate-ping opacity-75"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: '2s',
                  animationIterationCount: '3'
                }}
              />
            ))}
            
            {/* Étoiles scintillantes */}
            {[...Array(6)].map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute text-yellow-200 animate-pulse"
                style={{
                  left: `${10 + (i * 15)}%`,
                  top: `${5 + (i % 2) * 80}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '1.5s'
                }}
              >
                ✨
              </div>
            ))}
          </div>
          
          {/* Barre de progression de fermeture automatique */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div 
              className="h-full bg-white/50 transition-all duration-6000 ease-linear"
              style={{
                width: isVisible ? '0%' : '100%',
                transitionDuration: isVisible ? '6000ms' : '0ms'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}