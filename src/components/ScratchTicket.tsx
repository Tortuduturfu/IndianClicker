import React, { useState, useRef, useEffect, useCallback } from 'react';

// Types pour les props
interface Monster {
  name: string;
  image: string;
  rarity: 'commun' | 'rare' | 'épique' | 'monstrueux';
  multiplier: number;
}

interface ScratchTicketProps {
  monster: Monster;
  onReveal: (monster: Monster) => void;
  onClose: () => void;
}

export default function ScratchTicket({ monster, onReveal, onClose }: ScratchTicketProps) {
  const [scratchProgress, setScratchProgress] = useState(0);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showRevealAnimation, setShowRevealAnimation] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scratchedPixelsRef = useRef(new Set<string>());
  const totalPixelsRef = useRef(0);
  const animationFrameRef = useRef<number>();
  const particlePoolRef = useRef<HTMLElement[]>([]);
  const lastScratchTimeRef = useRef(0);

  // Pool de particules pour éviter les créations/destructions répétées
  const initParticlePool = useCallback(() => {
    const pool: HTMLElement[] = [];
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '10000';
      particle.style.borderRadius = '50%';
      particle.style.display = 'none';
      document.body.appendChild(particle);
      pool.push(particle);
    }
    particlePoolRef.current = pool;
  }, []);

  // Nettoyer le pool de particules
  const cleanupParticlePool = useCallback(() => {
    particlePoolRef.current.forEach(particle => {
      if (document.body.contains(particle)) {
        document.body.removeChild(particle);
      }
    });
    particlePoolRef.current = [];
  }, []);

  // Créer les contextes audio avec mise en cache
  const audioContextRef = useRef<AudioContext | null>(null);
  const createAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Fonction pour jouer un son basé sur la rareté (optimisée)
  const playRevealSound = useCallback((rarity: string) => {
    try {
      const audioContext = createAudioContext();
      
      const soundConfigs = {
        commun: {
          frequencies: [220, 261.63, 330],
          duration: 1.2,
          volume: 0.4,
          type: 'sine' as OscillatorType
        },
        rare: {
          frequencies: [174.61, 220, 261.63, 329.63, 392.00],
          duration: 1.8,
          volume: 0.5,
          type: 'triangle' as OscillatorType
        },
        épique: {
          frequencies: [130.81, 174.61, 220, 261.63, 329.63, 392.00, 523.25],
          duration: 2.5,
          volume: 0.6,
          type: 'sawtooth' as OscillatorType
        },
        monstrueux: {
          frequencies: [65.41, 87.31, 110, 130.81, 164.81, 196.00, 261.63, 329.63],
          duration: 3.2,
          volume: 0.8,
          type: 'square' as OscillatorType
        }
      };

      const config = soundConfigs[rarity as keyof typeof soundConfigs] || soundConfigs.commun;
      
      config.frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filterNode = audioContext.createBiquadFilter();
        
        oscillator.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.type = config.type;
        
        filterNode.type = 'lowpass';
        filterNode.frequency.setValueAtTime(freq * 2, audioContext.currentTime);
        filterNode.Q.setValueAtTime(rarity === 'monstrueux' ? 15 : 5, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(config.volume / config.frequencies.length, audioContext.currentTime + 0.05 + index * 0.08);
        gainNode.gain.exponentialRampToValueAtTime(config.volume / (config.frequencies.length * 2), audioContext.currentTime + config.duration / 2);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + config.duration);
        
        oscillator.start(audioContext.currentTime + index * 0.1);
        oscillator.stop(audioContext.currentTime + config.duration);
      });
    } catch (error) {
      console.log('Audio non supporté:', error);
    }
  }, [createAudioContext]);

  // Créer des particules d'explosion selon la rareté (optimisée)
  const createRevealExplosion = useCallback((rarity: string) => {
    const rarityConfigs = {
      commun: { count: 40, colors: ['#9CA3AF', '#6B7280', '#D1D5DB'], size: [4, 8] },
      rare: { count: 80, colors: ['#3B82F6', '#1D4ED8', '#60A5FA', '#DBEAFE'], size: [6, 12] },
      épique: { count: 120, colors: ['#8B5CF6', '#7C3AED', '#A855F7', '#DDD6FE'], size: [8, 16] },
      monstrueux: { count: 200, colors: ['#EF4444', '#DC2626', '#F87171', '#FCD34D', '#FFFFFF'], size: [10, 24] }
    };

    const config = rarityConfigs[rarity as keyof typeof rarityConfigs] || rarityConfigs.commun;
    const waves = rarity === 'monstrueux' ? 3 : rarity === 'épique' ? 2 : 1;
    
    for (let wave = 0; wave < waves; wave++) {
      setTimeout(() => {
        for (let i = 0; i < config.count / waves; i++) {
          const particle = document.createElement('div');
          const size = config.size[0] + Math.random() * (config.size[1] - config.size[0]);
          
          particle.style.cssText = `
            position: fixed;
            left: 50%;
            top: 50%;
            width: ${size}px;
            height: ${size}px;
            background-color: ${config.colors[Math.floor(Math.random() * config.colors.length)]};
            border-radius: ${Math.random() > 0.3 ? '50%' : Math.random() > 0.5 ? '0' : '25%'};
            pointer-events: none;
            z-index: 10001;
            transform: translate(-50%, -50%);
            will-change: transform, opacity;
          `;
          
          if (rarity === 'monstrueux') {
            particle.style.boxShadow = `0 0 ${size * 3}px rgba(239, 68, 68, 0.9), 0 0 ${size * 6}px rgba(220, 38, 38, 0.5)`;
          } else if (rarity === 'épique') {
            particle.style.boxShadow = `0 0 ${size * 2}px rgba(139, 92, 246, 0.7)`;
          } else if (rarity === 'rare') {
            particle.style.boxShadow = `0 0 ${size}px rgba(59, 130, 246, 0.5)`;
          }

          const angle = (Math.PI * 2 * i) / (config.count / waves) + (Math.random() - 0.5) * 1.2;
          const velocity = 120 + Math.random() * 300 + (wave * 50);
          const deltaX = Math.cos(angle) * velocity;
          const deltaY = Math.sin(angle) * velocity;
          
          let opacity = 1;
          let scale = 0.1;
          let x = 0;
          let y = 0;
          let rotation = Math.random() * 360;
          const rotationSpeed = (Math.random() - 0.5) * 20;
          
          const animate = () => {
            opacity -= 0.012;
            scale += 0.08;
            x += deltaX * 0.04;
            y += deltaY * 0.04;
            rotation += rotationSpeed;
            
            if (Math.random() > 0.7) {
              y += Math.sin(Date.now() * 0.01) * 2;
            }
            
            particle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale}) rotate(${rotation}deg)`;
            particle.style.opacity = opacity.toString();
            
            if (opacity > 0) {
              requestAnimationFrame(animate);
            } else {
              if (document.body.contains(particle)) {
                document.body.removeChild(particle);
              }
            }
          };
          
          document.body.appendChild(particle);
          requestAnimationFrame(animate);
        }
      }, wave * 200);
    }
  }, []);

  // Initialisation du canvas optimisée
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
      willReadFrequently: false
    });
    if (!ctx) return;

    // Optimisation du rendu
    ctx.imageSmoothingEnabled = false;

    // Dessiner la couche à gratter avec effet métallique
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
    );
    gradient.addColorStop(0, '#E8E8E8');
    gradient.addColorStop(0.3, '#C0C0C0');
    gradient.addColorStop(0.6, '#808080');
    gradient.addColorStop(0.8, '#606060');
    gradient.addColorStop(1, '#303030');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Reflets métalliques
    const highlightGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    highlightGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.3)');
    highlightGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.1)');
    highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = highlightGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.4);

    // Texture rugueuse optimisée
    ctx.save();
    ctx.globalAlpha = 0.1;
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      if (Math.random() > 0.98) {
        const brightness = Math.random() > 0.5 ? 255 : 0;
        data[i] = brightness;     // R
        data[i + 1] = brightness; // G
        data[i + 2] = brightness; // B
        data[i + 3] = 255;        // A
      } else {
        data[i + 3] = 0; // Transparent
      }
    }
    ctx.putImageData(imageData, 0, 0);
    ctx.restore();


    // Icône de pièce
    ctx.save();
    ctx.font = '32px Arial';
    ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#FFD700';
    ctx.fillText('🪙', canvas.width / 0.1, canvas.height / 100 + 50);
    ctx.restore();
    
    totalPixelsRef.current = canvas.width * canvas.height;
    
    // Initialiser le pool de particules
    initParticlePool();

    return () => {
      cleanupParticlePool();
    };
  }, [initParticlePool, cleanupParticlePool]);

  // Fonction optimisée pour créer des particules de grattage
  const createScratchParticles = useCallback((mouseX: number, mouseY: number) => {
    const now = Date.now();
    if (now - lastScratchTimeRef.current < 50) return; // Limiter la fréquence
    lastScratchTimeRef.current = now;

    // Utiliser le pool de particules
    const availableParticles = particlePoolRef.current.filter(p => p.style.display === 'none');
    const particlesToUse = availableParticles.slice(0, Math.min(8, availableParticles.length));

    particlesToUse.forEach((particle, i) => {
      const size = 2 + Math.random() * 3;
      const hue = 210 + Math.random() * 20;
      const lightness = 70 + Math.random() * 20;
      
      particle.style.cssText = `
        position: fixed;
        left: ${mouseX}px;
        top: ${mouseY}px;
        width: ${size}px;
        height: ${size}px;
        background-color: hsl(${hue}, 10%, ${lightness}%);
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
        display: block;
        will-change: transform, opacity;
      `;
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = 15 + Math.random() * 25;
      const deltaX = Math.cos(angle) * velocity;
      const deltaY = Math.sin(angle) * velocity - 10;
      
      let opacity = 1;
      let scale = 1;
      let x = 0;
      let y = 0;
      
      const animate = () => {
        opacity -= 0.04;
        scale -= 0.03;
        x += deltaX * 0.3;
        y += deltaY * 0.3;
        
        particle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
        particle.style.opacity = opacity.toString();
        
        if (opacity > 0 && scale > 0) {
          requestAnimationFrame(animate);
        } else {
          particle.style.display = 'none';
        }
      };
      
      requestAnimationFrame(animate);
    });
  }, []);

  // Fonction de grattage optimisée avec throttling
  const handleScratch = useCallback((clientX: number, clientY: number) => {
    if (isRevealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Créer les particules
    createScratchParticles(clientX, clientY);

    // Grattage optimisé
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    // Calcul de progression optimisé
    const radius = 25;
    let newPixelsScratched = 0;
    
    for (let dx = -radius; dx <= radius; dx += 3) { // Pas de 3 pour optimiser
      for (let dy = -radius; dy <= radius; dy += 3) {
        if (dx * dx + dy * dy <= radius * radius) {
          const pixelX = Math.floor(x + dx);
          const pixelY = Math.floor(y + dy);
          const pixelKey = `${pixelX},${pixelY}`;
          
          if (pixelX >= 0 && pixelX < canvas.width && pixelY >= 0 && pixelY < canvas.height) {
            if (!scratchedPixelsRef.current.has(pixelKey)) {
              scratchedPixelsRef.current.add(pixelKey);
              newPixelsScratched++;
            }
          }
        }
      }
    }

    const newProgress = Math.min((scratchedPixelsRef.current.size / totalPixelsRef.current) * 200, 100); // Facteur d'ajustement
    setScratchProgress(newProgress);

    if (newProgress >= 50 && !isRevealed) {
      setIsRevealed(true);
      setShowRevealAnimation(true);
      
      setTimeout(() => {
        playRevealSound(monster.rarity);
        createRevealExplosion(monster.rarity);
      }, 100);
      
      // Collection automatique après l'animation
      setTimeout(() => {
        setShowRevealAnimation(false);
        // Petit délai supplémentaire pour l'effet
        setTimeout(() => {
          onReveal(monster);
          onClose();
        }, 300);
      }, 2500); // Durée d'animation augmentée
    }
  }, [isRevealed, createScratchParticles, playRevealSound, createRevealExplosion, monster.rarity, onReveal]);

  // Gestionnaires d'événements de souris
  const handleMouseDown = useCallback(() => setIsScratching(true), []);
  const handleMouseUp = useCallback(() => setIsScratching(false), []);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isScratching) {
      handleScratch(e.clientX, e.clientY);
    }
  }, [isScratching, handleScratch]);

  // Gestionnaires d'événements tactiles pour mobile
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsScratching(true);
    const touch = e.touches[0];
    if (touch) {
      handleScratch(touch.clientX, touch.clientY);
    }
  }, [handleScratch]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (isScratching) {
      const touch = e.touches[0];
      if (touch) {
        handleScratch(touch.clientX, touch.clientY);
      }
    }
  }, [isScratching, handleScratch]);

  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsScratching(false);
  }, []);

  const rarityColors = {
    commun: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    épique: 'from-purple-400 to-purple-600',
    monstrueux: 'from-red-400 to-red-600'
  };

  // Messages insultants personnalisés par rareté
  const getRandomInsult = useCallback((rarity: string) => {
    const insults = {
      commun: [
        "Même ma grand-mère aurait fait mieux ! 🤡"
      ],
      rare: [
        "Un RARE ? Waouh, quelle prouesse ! 🙄",
      ],
      épique: [
        "Même cassé, tu arrives à être décevant ! 💔"
      ],
      monstrueux: [
        "Tu vas tout gâcher avec tes mains de beurre ! 🧈"
      ]
    };
    
    const rarityInsults = insults[rarity as keyof typeof insults] || insults.commun;
    return rarityInsults[Math.floor(Math.random() * rarityInsults.length)];
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-xl p-6 max-w-md w-full transition-all duration-1000 transform ${
      showRevealAnimation ? 
        monster.rarity === 'monstrueux' ? 'scale-125 shadow-2xl shadow-red-500/80 border-4 border-red-500 animate-pulse bg-gradient-to-br from-red-50 to-white' :
        monster.rarity === 'épique' ? 'scale-120 shadow-2xl shadow-purple-500/70 border-4 border-purple-500 animate-bounce bg-gradient-to-br from-purple-50 to-white' :
        monster.rarity === 'rare' ? 'scale-115 shadow-2xl shadow-blue-500/60 border-4 border-blue-500 animate-pulse bg-gradient-to-br from-blue-50 to-white' :
        'scale-110 shadow-xl border-2 border-gray-400 animate-pulse bg-gradient-to-br from-gray-50 to-white'
      : ''
    }`}>
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">🎫 Ticket à Gratter</h2>
          <div className="text-sm text-gray-600">
            Grattez pour découvrir votre Monster !
          </div>
        </div>

        <div className="relative mb-6">
          {/* Arrière-plan avec le monster - CACHÉ jusqu'à révélation */}
          <div className={`absolute inset-0 bg-gradient-to-br ${rarityColors[monster.rarity]} rounded-lg flex items-center justify-center transition-all duration-1000 ${
            showRevealAnimation ? 'shadow-2xl transform opacity-100' : 'opacity-0'
          } ${isRevealed && !showRevealAnimation ? 'opacity-100' : ''}`}>
            <div className="text-center text-white relative z-10">
              <div className={`text-6xl mb-2 transition-all duration-1000 ${
                showRevealAnimation ? 
                  monster.rarity === 'monstrueux' ? 'animate-bounce filter drop-shadow-2xl scale-125' :
                  monster.rarity === 'épique' ? 'animate-pulse filter drop-shadow-xl scale-110' :
                  monster.rarity === 'rare' ? 'animate-pulse filter drop-shadow-lg scale-105' :
                  'animate-pulse filter drop-shadow-md'
                : ''
              }`}>
                {monster.image}
              </div>
              <div className={`font-bold text-lg ${showRevealAnimation ? 'animate-pulse' : ''}`}>
                {monster.name}
              </div>
              <div className={`text-sm opacity-90 ${showRevealAnimation ? 'animate-pulse' : ''}`}>
                {monster.rarity.toUpperCase()}
              </div>
            </div>
            
            {/* Effets d'aura */}
            {monster.rarity === 'monstrueux' && showRevealAnimation && (
              <>
                <div className="absolute inset-0 rounded-lg bg-red-400 opacity-20 animate-ping -m-4"></div>
                <div className="absolute inset-0 rounded-lg bg-red-600 opacity-10 animate-pulse -m-8"></div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 opacity-15 animate-pulse -m-2"></div>
              </>
            )}
            {monster.rarity === 'épique' && showRevealAnimation && (
              <>
                <div className="absolute inset-0 rounded-lg bg-purple-400 opacity-20 animate-ping -m-4"></div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 opacity-10 animate-pulse -m-6"></div>
              </>
            )}
            {monster.rarity === 'rare' && showRevealAnimation && (
              <div className="absolute inset-0 rounded-lg bg-blue-400 opacity-20 animate-pulse -m-4"></div>
            )}
          </div>

          {/* Fond neutre quand le monster n'est pas révélé */}
          {!isRevealed && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-300">
                <div className="text-6xl mb-2">❓</div>
                <div className="font-bold text-lg">Monster Mystère</div>
                <div className="text-sm opacity-75">Grattez pour découvrir</div>
              </div>
            </div>
          )}

          {/* Canvas pour gratter avec support mobile */}
          <canvas
            ref={canvasRef}
            width={300}
            height={200}
            className="w-full h-50 rounded-lg cursor-pointer relative z-10 touch-none"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            style={{ touchAction: 'none' }}
          />
        </div>

        {/* Barre de progression */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progression</span>
            <span>{Math.round(scratchProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                scratchProgress >= 50 ? 'bg-green-500 animate-pulse' : 'bg-green-500'
              }`}
              style={{ width: `${scratchProgress}%` }}
            ></div>
          </div>
        </div>

        {isRevealed && !showRevealAnimation && (
          <div className="text-center animate-fade-in">
            <div className="text-green-600 font-bold text-lg mb-4 animate-bounce">
              🎉 Monster collecté automatiquement ! 🎉
            </div>
          </div>
        )}

        {isRevealed && showRevealAnimation && (
          <div className="text-center">
            <div className={`text-lg font-bold mb-4 animate-bounce ${
              monster.rarity === 'monstrueux' ? 'text-red-600' :
              monster.rarity === 'épique' ? 'text-purple-600' :
              monster.rarity === 'rare' ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {getRandomInsult(monster.rarity)}
            </div>
            <div className="text-sm text-gray-600 animate-pulse">
              Collection automatique en cours...
            </div>
          </div>
        )}

        {!isRevealed && (
          <div className="text-center text-gray-500 text-sm">
            Grattez au moins 50% pour révéler votre Monster
          </div>
        )}
      </div>
      
      {/* Styles pour les animations personnalisées */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}