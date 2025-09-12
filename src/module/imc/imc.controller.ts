import { Controller, Post, Body, ValidationPipe, Get } from '@nestjs/common';
import { ImcService } from './imc.service';
import { CalcularImcDto } from './dto/calcular-imc-dto';

@Controller('imc')
export class ImcController {
  constructor(private readonly imcService: ImcService) {}

  // POST /imc/calcular → calcula y guarda en Supabase
  @Post('calcular')
  calcular(@Body(ValidationPipe) data: CalcularImcDto) {
    return this.imcService.calcularImc(data);
  }

  // GET /imc/historial → devuelve todos los cálculos guardados
  @Get('historial')
  historial() {
    return this.imcService.historial();
  }
}
