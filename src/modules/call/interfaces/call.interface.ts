import { Document } from 'mongoose';

export interface Call extends Document {
  readonly calledAt: Date;
}