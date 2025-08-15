import { type Game, GameStatusValues, type GameStatus } from '../interfaces/Game.interface';
import './GameCard.css';

interface GameCardProps {
  game: Game;
  onGameDeleted: (id: string) => void;
  onGameUpdated: () => void;
}

export function GameCard({ game, onGameDeleted, onGameUpdated }: GameCardProps) {
  const handleDelete = async () => {
    if (!window.confirm(`Tem certeza que deseja deletar "${game.name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/games/${game.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Falha ao deletar o jogo na API.');
      }

      onGameDeleted(game.id); // Avisa o App que a deleção ocorreu

    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao deletar o jogo.');
    }
  };

  const handleStatusChange = async (newStatus: GameStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/games/${game.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar o status na API.');
      }

      onGameUpdated();

    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao atualizar o status do jogo.');
    }
  };

  return (
    <div className="game-card">
      <img src={game.coverImageUrl} alt={game.name} className="game-cover" />
      <div className="game-info">
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
      <div className="card-actions">
        <button onClick={handleDelete} className="delete-button">
          Deletar
        </button>
      </div>
    </div>
  );
}