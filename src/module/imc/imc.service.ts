import { Injectable } from "@nestjs/common";
import { CalcularImcDto } from "./dto/calcular-imc-dto";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class ImcService {
  constructor(private prisma: PrismaService) { }

  async calcularImc(data: CalcularImcDto, userId: string) {
    try {
      const { altura, peso } = data;

      if (!userId) throw new Error('❌ userId está vacío');

      const imc = peso / (altura * altura);
      const imcRedondeado = Math.round(imc * 100) / 100;

      let categoria = 'Obeso';
      if (imc < 18.5) categoria = 'Bajo peso';
      else if (imc < 25) categoria = 'Normal';
      else if (imc < 30) categoria = 'Sobrepeso';

      console.log('💾 Intentando guardar en DB con:', { peso, altura, imcRedondeado, categoria, userId });

      return await this.prisma.imc.create({
        data: {
          peso,
          altura,
          resultado: imcRedondeado,
          categoria,
          userId,
        },
      });
    } catch (err) {
      console.error('❌ Error en calcularImc:', err);
      throw err;
    }
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
