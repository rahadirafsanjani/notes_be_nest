import { Injectable } from '@nestjs/common';
import { CreateLabelNoteDto } from './dto/create-label-note.dto';
import { UpdateLabelNoteDto } from './dto/update-label-note.dto';

@Injectable()
export class LabelNotesService {
  create(createLabelNoteDto: CreateLabelNoteDto) {
    return 'This action adds a new labelNote';
  }

  findAll() {
    return `This action returns all labelNotes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} labelNote`;
  }

  update(id: number, updateLabelNoteDto: UpdateLabelNoteDto) {
    return `This action updates a #${id} labelNote`;
  }

  remove(id: number) {
    return `This action removes a #${id} labelNote`;
  }
}
