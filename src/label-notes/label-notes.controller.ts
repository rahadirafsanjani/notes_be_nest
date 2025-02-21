import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LabelNotesService } from './label-notes.service';
import { CreateLabelNoteDto } from './dto/create-label-note.dto';
import { UpdateLabelNoteDto } from './dto/update-label-note.dto';

@Controller('label-notes')
export class LabelNotesController {
  constructor(private readonly labelNotesService: LabelNotesService) {}

  @Post()
  create(@Body() createLabelNoteDto: CreateLabelNoteDto) {
    return this.labelNotesService.create(createLabelNoteDto);
  }

  @Get()
  findAll() {
    return this.labelNotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labelNotesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLabelNoteDto: UpdateLabelNoteDto) {
    return this.labelNotesService.update(+id, updateLabelNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labelNotesService.remove(+id);
  }
}
