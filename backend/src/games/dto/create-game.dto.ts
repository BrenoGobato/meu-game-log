import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateGameDto {
  @IsNumber()
  @IsNotEmpty()
  rawgId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  coverImageUrl: string;
}