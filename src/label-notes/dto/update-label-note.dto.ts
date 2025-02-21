import { PartialType } from '@nestjs/mapped-types';
import { CreateLabelNoteDto } from './create-label-note.dto';

export class UpdateLabelNoteDto extends PartialType(CreateLabelNoteDto) {}
