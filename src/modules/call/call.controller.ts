import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Validator } from 'class-validator';
import { CallService } from './call.service';
import { Call as CallInterface } from './interfaces/call.interface';

@Controller('calls')
export class CallsController {
  constructor(private readonly callService: CallService) {
  }

  @Get()
  async findAll(): Promise<CallInterface[]> {
    return this.callService.findAll();
  }

  @Get(':day')
  async findByDay(@Param('day') day: string) {
    const validator = new Validator();
    const dayExist = validator.isIn(day.toLowerCase(), ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']);
    if (!dayExist) {
      return 'Day is not exist in this world';
    }
    return this.callService.findByDay(day);
  }
}