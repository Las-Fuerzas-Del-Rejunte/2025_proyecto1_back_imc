import { BadRequestException, Injectable } from '@nestjs/common';
import { CalcularImcDto } from './dto/calcular-imc-dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ImcService {
  constructor(private prisma: PrismaService) { }

  private validar(dto: { altura: number; peso: number }) {
    const { altura, peso } = dto;
    const isNum = (v: any) => typeof v === 'number' && Number.isFinite(v);
    const decs = (v: number) => {
      const [, d = ''] = v.toString().split('.');
      return d.length;
    };

    if (altura == null || peso == null) throw new BadRequestException('altura y peso son requeridos');
    if (!isNum(altura) || !isNum(peso)) throw new BadRequestException('altura y peso deben ser números');
    if (altura < 0.01 || altura >= 3) throw new BadRequestException('altura fuera de rango');
    if (peso < 1 || peso > 500) throw new BadRequestException('peso fuera de rango');
    if (decs(altura) > 2) throw new BadRequestException('altura con más de 2 decimales');
    if (decs(peso) > 2) throw new BadRequestException('peso con más de 2 decimales');
  }

  async calcularImc(data: CalcularImcDto, userId: string) {
    this.validar(data);

    const imc = Number((data.peso / (data.altura * data.altura)).toFixed(2));
    const categoria =
      imc < 18.5 ? 'Bajo peso' :
      imc < 25   ? 'Normal' :
      imc < 30   ? 'Sobrepeso' : 'Obeso';

    // guarda en BD con el campo resultado (no imcRedondeado)
    const creado = await this.prisma.imc.create({
      data: {
        peso: data.peso,
        altura: data.altura,
        resultado: imc,
        categoria,
        userId,
      },
    });

    // devuelve el registro (asegurando propiedad resultado)
    return {
      ...creado,
      resultado: imc,
      categoria,
      userId,
    };
  }

  async historial(userId: string) {
    return this.prisma.imc.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
  async getStats(userId: string) {
    try {
      const historico = await this.prisma.imc.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' },
        select: { createdAt: true, resultado: true, peso: true, categoria: true },
      });

      const categorias = await this.prisma.imc.groupBy({
        by: ['categoria'],
        where: { userId },
        _count: { categoria: true },
      });

      const metrics = await this.prisma.imc.aggregate({
        where: { userId },
        _avg: { resultado: true },
        _count: true,
      });

      return {
        historico,
        categorias,
        metrics,
      };
    } catch (err) {
      console.error('❌ Error en getStats:', err);
      throw err;
    }
  }
}
