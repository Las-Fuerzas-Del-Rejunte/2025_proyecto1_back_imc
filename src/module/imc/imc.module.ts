import { Module } from '@nestjs/common';
import { ImcService } from './imc.service';
import { ImcController } from './imc.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ImcController],
  providers: [ImcService, PrismaService],
})
export class ImcModule {}
