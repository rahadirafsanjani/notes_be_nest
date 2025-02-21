import { IsNotEmpty, IsString } from 'class-validator';
export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
