import { useState, useEffect } from 'react';
import { AddGameForm } from './components/AddGameForm';
import { GameCard } from './components/GameCard';
import { type Game } from './interfaces/Game.interface';
import './App.css';

function App() {
  const [games, setGames] = useState<Game[]>([]);

  const fetchGames = async () => {
    try {
      const response = await fetch('http://localhost:3000/games');
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // Nova função para remover o jogo da lista na tela instantaneamente
  const handleGameDeleted = (deletedGameId: string) => {
    setGames(currentGames => currentGames.filter(game => game.id !== deletedGameId));
  };

  return (
    <div className="app-container">
      <h1>Meu Game Log</h1>
      <AddGameForm onGameAdded={fetchGames} />
      <hr className="separator" />
      <div className="game-list">
        {games.map((game) => (
          <GameCard 
            key={game.id} 
            game={game} 
            onGameDeleted={handleGameDeleted}
            onGameUpdated={fetchGames}
          />
        ))}
      </div>
    </div>
  );
}

export default App;