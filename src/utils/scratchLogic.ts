import React, { useState } from 'react';
import { generateRandomMonster, calculateTicketPrice, getPriceInfo } from '../utils/game';

// Exemple de composant qui utilise le système de prix progressif
const MonsterShop = () => {
  const [playerMoney, setPlayerMoney] = useState(2000);
  const [totalPurchases, setTotalPurchases] = useState(0); // IMPORTANT: Ajouter ce state
  const [monsters, setMonsters] = useState([]);

  // Calculer le prix actuel basé sur le nombre d'achats
  const currentTicketPrice = calculateTicketPrice(totalPurchases);
  const priceInfo = getPriceInfo(totalPurchases);

  const buyTicket = () => {
    // Utiliser le prix calculé dynamiquement, PAS la constante TICKET_PRICE
    if (playerMoney >= currentTicketPrice) {
      // Déduire l'argent
      setPlayerMoney(prev => prev - currentTicketPrice);
      
      // IMPORTANT: Incrémenter le nombre total d'achats
      setTotalPurchases(prev => prev + 1);
      
      // Générer le monster
      const newMonster = generateRandomMonster();
      setMonsters(prev => [...prev, newMonster]);
      
      console.log(`Ticket acheté pour ${currentTicketPrice} coins`);
      console.log(`Prochain ticket coûtera ${getPriceInfo(totalPurchases + 1).currentPrice} coins`);
    } else {
      console.log("Pas assez d'argent !");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2>Boutique de Monsters</h2>
        <p>Argent: {playerMoney} coins</p>
        <p>Achats totaux: {totalPurchases}</p>
      </div>
      
      <div className="mb-4 p-4 border rounded">
        <h3>Prix des tickets</h3>
        <p>Prix actuel: <strong>{priceInfo.currentPrice} coins</strong></p>
        <p>Prochain prix: {priceInfo.nextPrice} coins</p>
        <p>Augmentation: +{priceInfo.priceIncrease} coins</p>
        {priceInfo.isMaxPrice && <p className="text-red-500">Prix maximum atteint !</p>}
      </div>
      
      <button 
        onClick={buyTicket}
        disabled={playerMoney < currentTicketPrice}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Acheter un ticket ({currentTicketPrice} coins)
      </button>
      
      <div className="mt-4">
        <h3>Mes monsters ({monsters.length})</h3>
        {monsters.map((monster, index) => (
          <div key={index} className="p-2 border-b">
            {monster.name} - {monster.rarity}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonsterShop;