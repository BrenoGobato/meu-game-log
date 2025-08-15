import { useState, useEffect } from 'react';
import { AddGameForm } from './components/AddGameForm';
import { GameCard } from './components/GameCard'; // 1. Importar nosso novo componente
import type { Game } from './interfaces/Game.interface';
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

  return (
    <div className="app-container">
      <h1>Meu Game Log</h1>
      <AddGameForm onGameAdded={fetchGames} />
      <hr className="separator" />
      <div className="game-list">
        {games.map((game) => (
          // 2. Agora usamos nosso componente GameCard, muito mais limpo!
          <GameCard 
            key={game.id} 
            game={game} 
            onGameDeleted={fetchGames} // 3. Se um jogo for deletado, recarregamos a lista
          />
        ))}
      </div>
    </div>
  );
}

export default App;