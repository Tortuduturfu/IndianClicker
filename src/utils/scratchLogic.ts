import React, { useState, useEffect } from 'react';
import { 
  generateRandomMonster, 
  calculateTicketPrice, 
  getPriceInfo,
  savePurchasesToStorage,
  loadPurchasesFromStorage
} from '../utils/game';

const MonsterShop = () => {
  const [playerMoney, setPlayerMoney] = useState(2000);
  const [totalPurchases, setTotalPurchases] = useState(0);
  const [monsters, setMonsters] = useState([]);
  const [lastMonster, setLastMonster] = useState(null);

  // Charger le nombre d'achats depuis localStorage au démarrage
  useEffect(() => {
    const savedPurchases = loadPurchasesFromStorage();
    setTotalPurchases(savedPurchases);
  }, []);

  // Sauvegarder le nombre d'achats à chaque changement
  useEffect(() => {
    savePurchasesToStorage(totalPurchases);
  }, [totalPurchases]);

  // Calculer les informations de prix actuelles
  const priceInfo = getPriceInfo(totalPurchases);
  const currentTicketPrice = calculateTicketPrice(totalPurchases);

  const buyTicket = () => {
    // Vérifier si le joueur a assez d'argent
    if (playerMoney >= currentTicketPrice) {
      // Déduire l'argent avec le prix actuel (pas fixe!)
      setPlayerMoney(prev => prev - currentTicketPrice);
      
      // IMPORTANT: Incrémenter le compteur d'achats pour faire augmenter le prix
      setTotalPurchases(prev => prev + 1);
      
      // Générer le nouveau monster
      const newMonster = generateRandomMonster();
      setMonsters(prev => [...prev, newMonster]);
      setLastMonster(newMonster);
      
      console.log(`Ticket acheté pour ${currentTicketPrice} coins`);
      console.log(`Prochain ticket coûtera ${getPriceInfo(totalPurchases + 1).currentPrice} coins`);
    } else {
      alert(`Pas assez d'argent ! Il vous faut ${currentTicketPrice} coins.`);
    }
  };

  const resetGame = () => {
    setPlayerMoney(2000);
    setTotalPurchases(0);
    setMonsters([]);
    setLastMonster(null);
    localStorage.removeItem('totalMonsterPurchases');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Header avec informations du joueur */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-center mb-4">🎰 Boutique de Monsters</h1>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl">💰 Argent: <span className="font-bold text-green-600">{playerMoney} coins</span></p>
            <p className="text-lg">📦 Achats totaux: <span className="font-bold">{totalPurchases}</span></p>
          </div>
          <button 
            onClick={resetGame}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Reset Game
          </button>
        </div>
      </div>

      {/* Informations sur les prix */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">💸 Évolution des Prix</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800">Prix Actuel</h3>
            <p className="text-2xl font-bold text-blue-600">{priceInfo.currentPrice} coins</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-800">Prochain Prix</h3>
            <p className="text-2xl font-bold text-orange-600">{priceInfo.nextPrice} coins</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800">Augmentation</h3>
            <p className="text-2xl font-bold text-purple-600">+{priceInfo.priceIncrease} coins</p>
          </div>
        </div>
        
        {priceInfo.isMaxPrice && (
          <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
            <p className="text-red-700 font-semibold">🔴 Prix maximum atteint ! ({priceInfo.maxPrice} coins)</p>
          </div>
        )}
        
        <div className="mt-4 text-sm text-gray-600">
          <p>Prix de base: {priceInfo.basePrice} coins | Prix maximum: {priceInfo.maxPrice} coins</p>
        </div>
      </div>

      {/* Bouton d'achat */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
        <button 
          onClick={buyTicket}
          disabled={playerMoney < currentTicketPrice}
          className={`
            px-8 py-4 text-xl font-bold rounded-lg transition-all duration-200
            ${playerMoney >= currentTicketPrice 
              ? 'bg-green-500 hover:bg-green-600 text-white hover:scale-105' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          🎫 Acheter un Ticket ({currentTicketPrice} coins)
        </button>
        
        {playerMoney < currentTicketPrice && (
          <p className="mt-2 text-red-500">
            Il vous manque {currentTicketPrice - playerMoney} coins !
          </p>
        )}
      </div>

      {/* Dernier monster obtenu */}
      {lastMonster && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">🎉 Dernier Monster Obtenu</h2>
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg">
            <h3 className="text-xl font-bold">{lastMonster.name}</h3>
            <p className="text-lg">Rareté: <span className="font-semibold">{lastMonster.rarity}</span></p>
            <p>Prix de base: {lastMonster.basePrice} coins</p>
          </div>
        </div>
      )}

      {/* Collection de monsters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">👹 Ma Collection ({monsters.length} monsters)</h2>
        
        {monsters.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Aucun monster dans votre collection. Achetez votre premier ticket !</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {monsters.map((monster, index) => (
              <div 
                key={index} 
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-lg">{monster.name}</h3>
                <p className="text-sm text-gray-600">Rareté: {monster.rarity}</p>
                <p className="text-sm text-gray-600">Prix: {monster.basePrice} coins</p>
                <p className="text-xs text-gray-400">#{index + 1}</p>
              </div>
            ))}
          </div>
        )}
        
        {monsters.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">📊 Statistiques de Collection</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Communs</p>
                <p className="font-bold">{monsters.filter(m => m.rarity === 'commun').length}</p>
              </div>
              <div>
                <p className="text-gray-600">Rares</p>
                <p className="font-bold text-blue-600">{monsters.filter(m => m.rarity === 'rare').length}</p>
              </div>
              <div>
                <p className="text-gray-600">Épiques</p>
                <p className="font-bold text-purple-600">{monsters.filter(m => m.rarity === 'épique').length}</p>
              </div>
              <div>
                <p className="text-gray-600">Monstrueux</p>
                <p className="font-bold text-red-600">{monsters.filter(m => m.rarity === 'monstrueux').length}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonsterShop;