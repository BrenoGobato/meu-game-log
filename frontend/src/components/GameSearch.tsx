import {type  FormEvent, useState, type ChangeEvent } from 'react'; // Adicionar ChangeEvent
import { type GameSearchResult } from '../interfaces/Game.interface';
import './GameSearch.css';

interface GameSearchProps {
  onGameAdded: () => void;
}

export function GameSearch({ onGameAdded }: GameSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GameSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    if (!query) {
      setResults([]); // Garante que a busca limpe os resultados se o campo estiver vazio
      return;
    }

    setIsLoading(true);
    const apiKey = import.meta.env.VITE_RAWG_API_KEY;
    const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Erro ao buscar na API da RAWG:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGame = async (game: GameSearchResult) => {
    const newGame = {
      rawgId: game.id,
      name: game.name,
      coverImageUrl: game.background_image,
    };

    try {
      await fetch('http://localhost:3000/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGame),
      });

      onGameAdded(); // Avisa o App para recarregar a lista
      alert(`"${game.name}" foi adicionado à sua coleção!`);

      // --- MUDANÇA #1: Limpa os resultados e a busca após adicionar ---
      setResults([]);
      setQuery('');
      // ----------------------------------------------------------------

    } catch (error) {
      console.error('Erro ao adicionar jogo:', error);
      alert('Ocorreu um erro ao adicionar o jogo.');
    }
  };

  // --- MUDANÇA #2: Nova função para controlar a mudança no input ---
  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    // Se o usuário apagar todo o texto, limpamos os resultados
    if (newQuery === '') {
      setResults([]);
    }
  };
  // -----------------------------------------------------------------

  return (
    <div className="game-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleQueryChange} // Usamos a nova função aqui
          placeholder="Digite o nome de um jogo..."
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {/* Só mostra a div de resultados se houver resultados */}
      {results.length > 0 && (
        <div className="search-results">
          {results.map((game) => (
            <div key={game.id} className="result-card">
              <img src={game.background_image} alt={game.name} />
              <p>{game.name}</p>
              <button onClick={() => handleAddGame(game)}>Adicionar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}