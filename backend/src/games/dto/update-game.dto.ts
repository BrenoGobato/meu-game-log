import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { GameStatus } from '../game.entity'; // Importamos nosso enum

export class UpdateGameDto {
  // Note que não permitimos a atualização de todos os campos,
  // como o rawgId, que não deve mudar.

  @IsString()
  @IsOptional() // O decorator @IsOptional torna este campo não obrigatório
  name?: string;

  @IsEnum(GameStatus) // Garante que o valor seja um dos nossos status válidos
  @IsOptional()
  status?: GameStatus;

  @IsInt()
  @Min(1)
  @Max(5) 
  @IsOptional()
  rating?: number;
}