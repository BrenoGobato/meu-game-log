// 1. Definimos os status possíveis como um tipo.
//    Isso garante que só podemos usar uma dessas 4 strings.
export type GameStatus = 'BACKLOG' | 'PLAYING' | 'COMPLETED' | 'DROPPED';

// 2. Criamos um objeto para nos ajudar a usar esses valores no código.
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
  status: GameStatus; // A propriedade 'status' deve ser um dos tipos acima.
}