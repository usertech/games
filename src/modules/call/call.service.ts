import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';

import { Call } from './interfaces/call.interface';
import { CreateCallDto } from './dto/create-call.dto';
import { CALL_MODEL_PROVIDER } from '../../constants';

const weekDays = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

@Injectable()
export class CallService {
  constructor(
    @Inject(CALL_MODEL_PROVIDER) private readonly callModel: Model<Call>) {
  }

  async create(createCallDto: CreateCallDto): Promise<Call> {
    const createdPost = new this.callModel(createCallDto);
    return await createdPost.save();
  }

  async findAll(): Promise<Call[]> {
    return await this.callModel.find().exec();
  }

  async findByDay(dayName): Promise<Call[]> {
    const callsList = await this.callModel.find().exec();

    const dayFilteredCalls = callsList.filter((value) => {
      return new Date(value.calledAt).getDay().valueOf() === weekDays[dayName];
    });
    return dayFilteredCalls;
  }
}
