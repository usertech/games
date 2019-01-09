import { Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ICall } from '../interfaces/call.interface';

@Entity()
export class Call implements ICall {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  called_at: Date;
}
