import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function createApp() {
  const app = await NestFactory.create(AppModule);
  console.log('🚀 [DEBUG] Backend inicializando...'); // 👈 LOG DE ARRANQUE
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const config = new DocumentBuilder()
    .setTitle('IMC API')
    .setDescription('API para el cálculo del IMC')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.init();
  return app.getHttpAdapter().getInstance();
}

// 👇 exportación para Vercel
module.exports = async (req: any, res: any) => {
   console.log('📥 [DEBUG] Nueva request recibida en Vercel'); // 👈 LOG DE REQUEST
  const server = await createApp();
  return server(req, res);
};

// 👇 solo en local usamos listen()
if (process.env.VERCEL !== '1') {
  createApp().then(async (app: any) => {
    if (app.listen) await app.listen(3000);
  });
}
