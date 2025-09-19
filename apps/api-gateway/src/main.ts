import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiKeyGuard } from './modules/auth/api-key.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalGuards(new ApiKeyGuard());

  const config = new DocumentBuilder()
    .setTitle('Procura API Gateway')
    .setDescription('Gateway (minimal)')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, doc);

  const port = process.env.PORT ? +process.env.PORT : 3000;
  await app.listen(port);
  console.log(\`API Gateway listening on http://localhost:\${port}\`);
}
bootstrap();
