import { Controller, Get } from '@nestjs/common';
import { CallService } from './call.service';

@Controller('calls')
export class CallController {
  constructor(private readonly callService: CallService) {}

  @Get('/')
  async getCallInfo() {
    try {
      return await this.callService.getCalls();
    } catch (e) {
      throw Error(e);
    }
  }
}
