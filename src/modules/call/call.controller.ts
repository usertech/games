import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { Validator } from 'class-validator';
import { CreateCallDto } from './dto/create-call.dto';
import { CallService } from './call.service';
import { Call as CallInterface } from './interfaces/call.interface';

@Controller('calls')
export class CallsController {
  constructor(private readonly callService: CallService) {
  }

  @Post()
  async create(@Body() createCallDto: CreateCallDto) {
    this.callService.create(createCallDto);
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