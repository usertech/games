import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { ConfigService } from 'modules/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  await app.listen(config.port);
}
bootstrap();
