import * as mongoose from 'mongoose';

export const CallSchema = new mongoose.Schema({
  calledAt: {
    type: Date,
    required: true,
  },
});