import { Module } from '@nestjs/common';
import { LabelNotesService } from './label-notes.service';
import { LabelNotesController } from './label-notes.controller';

@Module({
  controllers: [LabelNotesController],
  providers: [LabelNotesService],
})
export class LabelNotesModule {}
