// Ajouter cette fonction au début du composant App, après les imports
const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') return;
  
  document.documentElement.setAttribute('data-theme', theme);
  document.body.className = `theme-${theme}`;
  
  const root = document.documentElement;
  
  switch(theme) {
    case 'dark':
      root.style.setProperty('--bg-primary', '#1a1a2e');
      root.style.setProperty('--bg-secondary', '#16213e');
      root.style.setProperty('--bg-tertiary', '#0f172a');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#e2e8f0');
      root.style.setProperty('--accent', '#3b82f6');
      root.style.setProperty('--accent-hover', '#2563eb');
      root.style.setProperty('--success', '#10b981');
      root.style.setProperty('--warning', '#f59e0b');
      root.style.setProperty('--danger', '#ef4444');
      root.style.setProperty('--border', '#374151');
      root.style.setProperty('--shadow', 'rgba(0, 255, 255, 0.4)');
      break;
    case 'retro':
      root.style.setProperty('--bg-primary', '#2c1810');
      root.style.setProperty('--bg-secondary', '#4a2c17');
      root.style.setProperty('--bg-tertiary', '#8b4513');
      root.style.setProperty('--text-primary', '#fff8dc');
      root.style.setProperty('--text-secondary', '#daa520');
      root.style.setProperty('--accent', '#ff6347');
      root.style.setProperty('--accent-hover', '#ff4500');
      root.style.setProperty('--success', '#32cd32');
      root.style.setProperty('--warning', '#ffd700');
      root.style.setProperty('--danger', '#dc143c');
      root.style.setProperty('--border', '#cd853f');
      root.style.setProperty('--shadow', 'rgba(255, 99, 71, 0.3)');
      break;
  }
};

// Ajouter ce useEffect dans le composant App, après l'initialisation du gameState
useEffect(() => {
  // Appliquer le thème au démarrage de l'application
  applyTheme(gameState.settings.theme);
}, [gameState.settings.theme]);

// Modifier la fonction updateSettings pour appliquer le thème immédiatement
const updateSettings = (newSettings: Partial<GameState['settings']>) => {
  setGameState(prev => {
    const updatedSettings = { ...prev.settings, ...newSettings };
    
    // Si le thème change, l'appliquer immédiatement
    if (newSettings.theme && newSettings.theme !== prev.settings.theme) {
      applyTheme(newSettings.theme);
    }
    
    return {
      ...prev,
      settings: updatedSettings
    };
  });
};0, 0, 0, 0.3)');
      break;
    case 'light':
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f8fafc');
      root.style.setProperty('--bg-tertiary', '#f1f5f9');
      root.style.setProperty('--text-primary', '#1e293b');
      root.style.setProperty('--text-secondary', '#475569');
      root.style.setProperty('--accent', '#3b82f6');
      root.style.setProperty('--accent-hover', '#2563eb');
      root.style.setProperty('--success', '#10b981');
      root.style.setProperty('--warning', '#f59e0b');
      root.style.setProperty('--danger', '#ef4444');
      root.style.setProperty('--border', '#e2e8f0');
      root.style.setProperty('--shadow', 'rgba(0, 0, 0, 0.1)');
      break;
    case 'neon':
      root.style.setProperty('--bg-primary', '#0a0a0f');
      root.style.setProperty('--bg-secondary', '#1a0d2e');
      root.style.setProperty('--bg-tertiary', '#2d1b4e');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#e879f9');
      root.style.setProperty('--accent', '#f59e0b');
      root.style.setProperty('--accent-hover', '#d97706');
      root.style.setProperty('--success', '#00ff88');
      root.style.setProperty('--warning', '#ffff00');
      root.style.setProperty('--danger', '#ff0055');
      root.style.setProperty('--border', '#7c3aed');
      root.style.setProperty('--shadow', 'rgba(124, 58, 237, 0.3)');
      break;
    case 'forest':
      root.style.setProperty('--bg-primary', '#1a2e1a');
      root.style.setProperty('--bg-secondary', '#2d4a2d');
      root.style.setProperty('--bg-tertiary', '#0f1f0f');
      root.style.setProperty('--text-primary', '#f0fff0');
      root.style.setProperty('--text-secondary', '#90ee90');
      root.style.setProperty('--accent', '#22c55e');
      root.style.setProperty('--accent-hover', '#16a34a');
      root.style.setProperty('--success', '#4ade80');
      root.style.setProperty('--warning', '#facc15');
      root.style.setProperty('--danger', '#f87171');
      root.style.setProperty('--border', '#15803d');
      root.style.setProperty('--shadow', 'rgba(34, 197, 94, 0.2)');
      break;
    case 'ocean':
      root.style.setProperty('--bg-primary', '#0c1445');
      root.style.setProperty('--bg-secondary', '#1e3a8a');
      root.style.setProperty('--bg-tertiary', '#1e40af');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#93c5fd');
      root.style.setProperty('--accent', '#06b6d4');
      root.style.setProperty('--accent-hover', '#0891b2');
      root.style.setProperty('--success', '#0ea5e9');
      root.style.setProperty('--warning', '#f59e0b');
      root.style.setProperty('--danger', '#f97316');
      root.style.setProperty('--border', '#1d4ed8');
      root.style.setProperty('--shadow', 'rgba(6, 182, 212, 0.3)');
      break;
    case 'sunset':
      root.style.setProperty('--bg-primary', '#451a03');
      root.style.setProperty('--bg-secondary', '#7c2d12');
      root.style.setProperty('--bg-tertiary', '#a16207');
      root.style.setProperty('--text-primary', '#fef7cd');
      root.style.setProperty('--text-secondary', '#fed7aa');
      root.style.setProperty('--accent', '#f97316');
      root.style.setProperty('--accent-hover', '#ea580c');
      root.style.setProperty('--success', '#22c55e');
      root.style.setProperty('--warning', '#eab308');
      root.style.setProperty('--danger', '#dc2626');
      root.style.setProperty('--border', '#ea580c');
      root.style.setProperty('--shadow', 'rgba(249, 115, 22, 0.3)');
      break;
    case 'cyberpunk':
      root.style.setProperty('--bg-primary', '#000000');
      root.style.setProperty('--bg-secondary', '#1a0033');
      root.style.setProperty('--bg-tertiary', '#330066');
      root.style.setProperty('--text-primary', '#00ffff');
      root.style.setProperty('--text-secondary', '#ff00ff');
      root.style.setProperty('--accent', '#ffff00');
      root.style.setProperty('--accent-hover', '#cccc00');
      root.style.setProperty('--success', '#00ff00');
      root.style.setProperty('--warning', '#ff8800');
      root.style.setProperty('--danger', '#ff0080');
      root.style.setProperty('--border', '#ff00ff');
      root.style.setProperty('--shadow', 'rgba(