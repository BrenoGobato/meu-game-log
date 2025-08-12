import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './game.entity';

@Injectable()
export class GamesService {
  // 1. Injetando o Repositório no construtor
  constructor(
    @InjectRepository(Game)
    private readonly gamesRepository: Repository<Game>,
  ) {}

  // 2. Nosso primeiro método para criar um jogo
  async create(gameData: {
    rawgId: number;
    name: string;
    coverImageUrl: string;
  }): Promise<Game> {
    const newGame = this.gamesRepository.create(gameData);

    return this.gamesRepository.save(newGame);
  }
}