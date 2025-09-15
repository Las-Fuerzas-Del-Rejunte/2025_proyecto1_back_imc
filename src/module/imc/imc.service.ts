import { Injectable } from "@nestjs/common";
import { CalcularImcDto } from "./dto/calcular-imc-dto";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class ImcService {
  constructor(private prisma: PrismaService) {}

  async calcularImc(data: CalcularImcDto) {
    const { altura, peso } = data;

    // Validaciones
    if (altura === undefined || altura === null) {
      throw new Error('La altura es obligatoria');
    }
    if (peso === undefined || peso === null) {
      throw new Error('El peso es obligatorio');
    }
    if (typeof altura !== 'number' || typeof peso !== 'number') {
      throw new Error('Altura y peso deben ser números');
    }
    if (altura <= 0 || altura >= 3) {
      throw new Error('La altura debe estar entre 0 y 3 metros');
    }
    if (peso < 1 || peso > 500) {
      throw new Error('El peso debe estar entre 1 y 500 kg');
    }

    const imc = peso / (altura * altura);
    const imcRedondeado = Math.round(imc * 100) / 100;

    let categoria: string;
    if (imc < 18.5) {
      categoria = 'Bajo peso';
    } else if (imc < 25) {
      categoria = 'Normal';
    } else if (imc < 30) {
      categoria = 'Sobrepeso';
    } else {
      categoria = 'Obeso';
    }

    // Guardar en Supabase usando Prisma
    const registro = await this.prisma.imc.create({
      data: {
        peso,
        altura,
        resultado: imcRedondeado,
        categoria,
      },
    });

    return registro; // Devuelve lo que se guardó
  }

  async historial() {
    return this.prisma.imc.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
