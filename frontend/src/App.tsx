import { useState, useEffect } from 'react';
import { GameSearch } from './components/GameSearch';
import { GameCard } from './components/GameCard';
import { type Game } from './interfaces/Game.interface';
import './App.css';

function App() {
  const [games, setGames] = useState<Game[]>([]);

  const fetchGames = async () => {
    try {
      const response = await fetch('http://localhost:3000/games');
      const data = await response.json();
      // Ordenamos os jogos por data de atualização para ver os mais recentes primeiro
      const sortedData = data.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      setGames(sortedData);
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleGameDeleted = (deletedGameId: string) => {
    setGames(currentGames => currentGames.filter(game => game.id !== deletedGameId));
  };

  const handleGameUpdate = (updatedGame: Game) => {
    setGames(currentGames =>
      currentGames.map(game =>
        game.id === updatedGame.id ? updatedGame : game
      )
    );
  };

  // --- MUDANÇA PRINCIPAL: FILTRANDO OS JOGOS POR STATUS ---
  const playingGames = games.filter(game => game.status === 'PLAYING');
  const backlogGames = games.filter(game => game.status === 'BACKLOG');
  const completedGames = games.filter(game => game.status === 'COMPLETED');
  const droppedGames = games.filter(game => game.status === 'DROPPED');
  // -----------------------------------------------------------

  return (
    <div className="app-container">
      <h1>Meu Game Log</h1>
      <GameSearch onGameAdded={fetchGames} />

      {/* --- NOVO LAYOUT DE RENDERIZAÇÃO COM SEÇÕES --- */}

      {playingGames.length > 0 && (
        <section>
          <h2>Jogando Agora</h2>
          <div className="game-list">
            {playingGames.map((game) => (
              <GameCard key={game.id} game={game} onGameDeleted={handleGameDeleted} onGameUpdated={handleGameUpdate} />
            ))}
          </div>
        </section>
      )}

      {backlogGames.length > 0 && (
        <section>
          <h2>Backlog</h2>
          <div className="game-list">
            {backlogGames.map((game) => (
              <GameCard key={game.id} game={game} onGameDeleted={handleGameDeleted} onGameUpdated={handleGameUpdate} />
            ))}
          </div>
        </section>
      )}

      {completedGames.length > 0 && (
        <section>
          <h2>Finalizados</h2>
          <div className="game-list">
            {completedGames.map((game) => (
              <GameCard key={game.id} game={game} onGameDeleted={handleGameDeleted} onGameUpdated={handleGameUpdate} />
            ))}
          </div>
        </section>
      )}

      {droppedGames.length > 0 && (
        <section>
          <h2>Desistiu</h2>
          <div className="game-list">
            {droppedGames.map((game) => (
              <GameCard key={game.id} game={game} onGameDeleted={handleGameDeleted} onGameUpdated={handleGameUpdate} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default App;