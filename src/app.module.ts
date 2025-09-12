import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { ImcModule } from './module/imc/imc.module';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';


@Module({
  imports: [ImcModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}