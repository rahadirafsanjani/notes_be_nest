import { Label } from 'src/labels/entities/label.entity';
import { Notes } from 'src/notes/entities/note.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class LabelNotes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Notes, (note) => note.labelNotes, { onDelete: 'CASCADE' })
  note: Promise<Notes>;

  @ManyToOne(() => Label, (label) => label.labelNotes, { onDelete: 'CASCADE' })
  label: Promise<Label>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
