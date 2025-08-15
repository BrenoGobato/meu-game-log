import { useState, useEffect } from 'react';
import { AddGameForm } from './components/AddGameForm'; // 1. Importar nosso novo componente
import type { Game } from './interfaces/Game.interface.ts'; // (Vamos criar essa interface)
import './App.css';

function App() {
  const [games, setGames] = useState<Game[]>([]);

  // 2. Transformamos a lógica de busca em uma função reutilizável
  const fetchGames = async () => {
    try {
      const response = await fetch('http://localhost:3000/games');
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
    }
  };

  // O useEffect agora apenas chama nossa função de busca
  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="app-container">
      <h1>Meu Game Log</h1>
      {/* 3. Adicionamos o formulário e passamos a função fetchGames para ele */}
      <AddGameForm onGameAdded={fetchGames} />
      <hr className="separator" />
      <div className="game-list">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <img src={game.coverImageUrl} alt={game.name} className="game-cover" />
            <div className="game-info">
              <p className="game-name">{game.name}</p>
              <p className="game-status">{game.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;