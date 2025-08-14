import { useState, useEffect } from 'react';

// 1. Definimos a "forma" de um objeto de jogo com TypeScript
interface Game {
  id: string;
  name: string;
  coverImageUrl: string;
  status: string;
}

function App() {
  // 2. Criamos um "estado" (memória) para guardar a lista de jogos
  const [games, setGames] = useState<Game[]>([]);

  // 3. useEffect é executado uma vez, quando o componente é montado na tela
  useEffect(() => {
    const apiUrl = 'http://localhost:3000/games'; // A URL do nosso backend!

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setGames(data); // 4. Salvamos os dados recebidos no nosso estado
      })
      .catch(error => console.error('Erro ao buscar jogos:', error));
  }, []); // O array vazio [] garante que isso só roda uma vez

  return (
    <div>
      <h1>Meu Game Log</h1>

      {/* 5. Mapeamos a lista de jogos e exibimos cada um */}
      <ul>
        {games.map(game => (
          <li key={game.id}>
            <img src={game.coverImageUrl} alt={game.name} width="60" />
            <p>{game.name} ({game.status})</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App