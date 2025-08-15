import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

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

  async findOne(id: string): Promise<Game> {
    const game = await this.gamesRepository.findOneBy({ id });
    if (!game) {
      throw new NotFoundException(`Game with ID "${id}" not found`);
    }
    return game;
  }

  async update(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    const game = await this.findOne(id);
    Object.assign(game, updateGameDto);
    return this.gamesRepository.save(game);
  }

  // A função que estava faltando
  async remove(id: string): Promise<void> {
    const game = await this.findOne(id);
    await this.gamesRepository.remove(game);
  }
}