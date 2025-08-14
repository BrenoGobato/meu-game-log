import { Injectable, NotFoundException } from '@nestjs/common'; // Adicionar NotFoundException
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gamesRepository: Repository<Game>,
  ) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const newGame = this.gamesRepository.create(createGameDto);
    return this.gamesRepository.save(newGame);
  }

  async findAll(): Promise<Game[]> {
    return this.gamesRepository.find();
  }

  // NOSSO NOVO MÉTODO PARA BUSCAR UM JOGO ESPECÍFICO
  async findOne(id: string): Promise<Game> {
    const game = await this.gamesRepository.findOneBy({ id });

    if (!game) {
      // Lançar um erro se o jogo com o ID fornecido não for encontrado
      throw new NotFoundException(`Game with ID "${id}" not found`);
    }

    return game;
  }
}