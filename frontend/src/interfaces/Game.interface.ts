export type GameStatus = 'BACKLOG' | 'PLAYING' | 'COMPLETED' | 'DROPPED';

export const GameStatusValues = {
  BACKLOG: 'BACKLOG' as GameStatus,
  PLAYING: 'PLAYING' as GameStatus,
  COMPLETED: 'COMPLETED' as GameStatus,
  DROPPED: 'DROPPED' as GameStatus,
};

export interface Game {
  id: string;
  name: string;
  coverImageUrl: string;
  status: GameStatus;
  rating: number | null;
  createdAt: string; // Adicionado
  updatedAt: string; // Adicionado
}

export interface GameSearchResult {
  id: number;
  name: string;
  background_image: string;
}