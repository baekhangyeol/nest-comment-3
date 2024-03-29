import { IsNotEmpty } from 'class-validator';

export class CreateLikeRequestDto {
  @IsNotEmpty()
  name: String;
}