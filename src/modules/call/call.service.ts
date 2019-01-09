import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Call } from './entities/call.entity';
import { Repository } from 'typeorm';
import { ICall } from './interfaces/call.interface';
import * as moment from 'moment';

enum daysOfWeek {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7,
}

@Injectable()
export class CallService {
  constructor(
    @InjectRepository(Call)
    private readonly callRepository: Repository<Call>,
  ) {}

  /**
   * Returns list of calls
   */
  public async getCalls(): Promise<ICall[]> {
    return this.callRepository.find();
  }

  /**
   * Returns only a list of calls made on Monday
   */
  public async getCallsOnMondays(): Promise<ICall[]> {
    const calls = await this.callRepository.find();
    return calls.filter(
      call => this.getDayOfWeek(call.called_at) === daysOfWeek.Monday,
    );
  }

  /**
   * Logs a call
   */
  public async log(): Promise<ICall> {
    const call = this.callRepository.create();
    return this.callRepository.save(call);
  }

  private getDayOfWeek(date: Date): daysOfWeek {
    return moment(date).day();
  }
}
