import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum GameStatus {
  BACKLOG = 'BACKLOG', // Na lista para jogar
  PLAYING = 'PLAYING', // Jogando atualmente
  COMPLETED = 'COMPLETED', // Finalizado
  DROPPED = 'DROPPED', // Desistiu de jogar
}

@Entity({ name: 'games' }) // Define o nome da tabela no banco de dados como "games"
export class Game {
  @PrimaryGeneratedColumn('uuid') // Chave primária que gera um ID único (ex: a1b2-c3d4-...)
  id: string;

  @Column() // Uma coluna normal do tipo texto
  name: string;

  @Column({ name: 'cover_image_url' }) // Coluna para a URL da imagem de capa
  coverImageUrl: string;
  
  @Column({ name: 'rawg_id', unique: true })
rawgId: number;

  @Column({ type: 'int', nullable: true, default: null })
  rating: number;

  @Column({
    type: 'enum',
    enum: GameStatus,
    default: GameStatus.BACKLOG,
  })
  status: GameStatus

  @CreateDateColumn({ name: 'created_at' }) // Coluna que salva a data de criação automaticamente
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' }) // Coluna que atualiza a data a cada modificação
  updatedAt: Date;
}