import type { Game } from '../interfaces/Game.interface';
import './GameCard.css'; // Vamos criar este arquivo de estilo

interface GameCardProps {
  game: Game;
  onGameDeleted: () => void; // Função para avisar o App.tsx que um jogo foi deletado
}

export function GameCard({ game, onGameDeleted }: GameCardProps) {

  const handleDelete = async () => {
    // Pede uma confirmação ao usuário antes de deletar
    if (!window.confirm(`Tem certeza que deseja deletar "${game.name}"?`)) {
      return; // Se o usuário cancelar, a função para aqui
    }

    try {
      const response = await fetch(`http://localhost:3000/games/${game.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Falha ao deletar o jogo na API.');
      }

      // Se a deleção no backend deu certo, avisa o componente App
      onGameDeleted();

    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao deletar o jogo.');
    }
  };

  return (
    <div className="game-card">
      <img src={game.coverImageUrl} alt={game.name} className="game-cover" />
      <div className="game-info">
        <p className="game-name">{game.name}</p>
        <p className="game-status">{game.status}</p>
      </div>
      <div className="card-actions">
        <button onClick={handleDelete} className="delete-button">
          Deletar
        </button>
      </div>
    </div>
  );
}