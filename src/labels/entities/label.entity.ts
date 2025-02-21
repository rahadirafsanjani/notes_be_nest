import { LabelNotes } from 'src/label-notes/entities/label-note.entity';
import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => LabelNotes, (LabelNote) => LabelNote.label)
  labelNotes: Promise<LabelNotes[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
