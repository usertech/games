import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { ConfigService } from 'modules/config/config.service';
import { ConfigModule } from 'modules/config/config.module';

async function bootstrap() {
  const configModule = await NestFactory.create(ConfigModule);
  const configService = configModule.get<ConfigService>(ConfigService);
  const app = await NestFactory.create(AppModule.forRoot(configService));
  const config = app.get<ConfigService>(ConfigService);
  await app.listen(config.port);
}
bootstrap();
