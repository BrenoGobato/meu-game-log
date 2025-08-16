import { type Game, GameStatusValues, type GameStatus } from '../interfaces/Game.interface';
import './GameCard.css';

interface GameCardProps {
  game: Game;
  onGameDeleted: (id: string) => void;
  onGameUpdated: (updatedGame: Game) => void; // A prop agora espera o jogo atualizado
}

export function GameCard({ game, onGameDeleted, onGameUpdated }: GameCardProps) {
  const handleDelete = async () => { /* ...código existente, sem mudanças... */ };

  const updateGameOnApi = async (updateData: { status?: GameStatus, rating?: number | null }) => {
    try {
      const response = await fetch(`http://localhost:3000/games/${game.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar o jogo na API.');
      }

      const updatedGameFromServer = await response.json();
      onGameUpdated(updatedGameFromServer); // Avisa o App com o novo objeto do jogo

    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao atualizar o jogo.');
    }
  };

  const handleStatusChange = (newStatus: GameStatus) => {
    updateGameOnApi({ status: newStatus });
  };

  const handleRatingChange = (newRating: number) => {
    const ratingToSend = newRating === game.rating ? null : newRating;
    updateGameOnApi({ rating: ratingToSend });
  };

  return (
    <div className="game-card">
      <img src={game.coverImageUrl} alt={game.name} className="game-cover" />
      <div className="game-info">
        <div>
          <p className="game-name">{game.name}</p>
          <select
            className="status-select"
            value={game.status}
            onChange={(e) => handleStatusChange(e.target.value as GameStatus)}
          >
            <option value={GameStatusValues.BACKLOG}>Backlog</option>
            <option value={GameStatusValues.PLAYING}>Jogando</option>
            <option value={GameStatusValues.COMPLETED}>Finalizado</option>
            <option value={GameStatusValues.DROPPED}>Desistiu</option>
          </select>
        </div>

        {/* --- LÓGICA CONDICIONAL PARA MOSTRAR AS ESTRELAS --- */}
        {(game.status === 'PLAYING' || game.status === 'COMPLETED' || game.status === 'DROPPED') && (
          <div className="star-rating">
            {[5, 4, 3, 2, 1].map((starValue) => (
              <span
                key={starValue}
                className={`star ${game.rating && starValue <= game.rating ? 'filled' : ''}`}
                onClick={() => handleRatingChange(starValue)}
              >
                ★
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="card-actions">
        <button onClick={handleDelete} className="delete-button">
          Deletar
        </button>
      </div>
    </div>
  );
}