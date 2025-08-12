import { Body, Controller, Post } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';

@Controller('games')
export class GamesController {
  // 1. Injetamos o GamesService no controller
  constructor(private readonly gamesService: GamesService) {}

  // 2. Criamos o endpoint POST /games
  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }
}