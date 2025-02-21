import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notes } from './entities/notes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Notes)
    private readonly notesRepository: Repository<Notes>,
  ) {}

  async findAll(): Promise<Notes[]> {
    return await this.notesRepository.find();
  }

  // async findByUsers(): Promise<Notes[]> {
  //   return await this.notesRepository.findBy()
  // }
}
