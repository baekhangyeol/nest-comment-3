import { IsNotEmpty } from 'class-validator';

export class CreateReportRequestDto {
  @IsNotEmpty()
  name: String;

  @IsNotEmpty()
  content: String;
}