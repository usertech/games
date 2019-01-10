import { Controller, Get, UseGuards } from '@nestjs/common';
import { CallService } from './call.service';
import { AuthGuard } from './auth.guard';

@Controller('calls')
@UseGuards(AuthGuard)
export class CallController {
  constructor(private readonly callService: CallService) {}

  @Get('/')
  async getCallInfo() {
    try {
      return await this.callService.getCallsOnMondays();
    } catch (e) {
      throw Error(e);
    }
  }
}
