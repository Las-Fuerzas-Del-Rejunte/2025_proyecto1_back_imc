import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// 👇 cache del server para Vercel (serverless)
let cachedServer: any;

async function bootstrap() {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
    );

    const config = new DocumentBuilder()
      .setTitle('IMC API')
      .setDescription('API para el cálculo del IMC')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    // 👇 en Vercel no usamos listen, solo init
    await app.init();
    cachedServer = app.getHttpAdapter().getInstance();
  }
  return cachedServer;
}

// 👇 si estamos en Vercel exportamos el handler
declare const module: any;
if (module?.exports) {
  module.exports = async (req: any, res: any) => {
    const server = await bootstrap();
    return server(req, res);
  };
} else {
  // 👇 si estamos en local, usamos listen(3000)
  bootstrap().then(async (app: any) => {
    if (app.listen) {
      await app.listen(3000);
    }
  });
}
