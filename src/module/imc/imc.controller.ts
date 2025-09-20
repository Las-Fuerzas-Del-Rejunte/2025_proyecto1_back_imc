import { Controller, Post, Body, ValidationPipe, Get, Req, UseGuards } from '@nestjs/common';
import { ImcService } from './imc.service';
import { CalcularImcDto } from './dto/calcular-imc-dto';
import { SupabaseAuthGuard } from '../../auth/supabase.guard';
import { Request } from 'express';

@Controller('imc')
@UseGuards(SupabaseAuthGuard)
export class ImcController {
  constructor(private readonly imcService: ImcService) { }

  @Post('calcular')
  async calcular(@Body(ValidationPipe) data: CalcularImcDto, @Req() req: Request) {
    console.log('📥 [IMC::Controller] Body recibido:', data);
    console.log('👤 [IMC::Controller] Usuario recibido en req.user:', req.user);

    const userId = (req.user as any)?.id || (req.user as any)?.user_metadata?.sub;
    if (!userId) {
      console.error('❌ No se encontró id o sub en req.user');
      throw new Error('Usuario no autenticado');
    }

    return this.imcService.calcularImc(data, userId);
  }

  @Get('historial')
  async historial(@Req() req: Request) {
    console.log('👤 Usuario recibido en req.user:', req.user);
    const userId = (req.user as any)?.id || (req.user as any)?.user_metadata?.sub;
    if (!userId) throw new Error('Usuario no autenticado');
    return this.imcService.historial(userId);
  }

  @Get('stats')
  async stats(@Req() req: Request) {
    console.log('📊 [IMC::Controller] Generando estadísticas...');
    const userId = (req.user as any)?.id || (req.user as any)?.user_metadata?.sub;
    if (!userId) throw new Error('Usuario no autenticado');
    return this.imcService.getStats(userId);
  }
}
