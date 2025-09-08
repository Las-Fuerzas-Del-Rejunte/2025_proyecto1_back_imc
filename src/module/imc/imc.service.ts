import { Injectable } from "@nestjs/common";
import { CalcularImcDto } from "./dto/calcular-imc-dto";


@Injectable()
export class ImcService {
  calcularImc(data: CalcularImcDto): { imc: number; categoria: string } {
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
    if (altura <= 0) {
      throw new Error('La altura debe ser mayor que 0');
    }
    if (altura >= 3) {
      throw new Error('La altura debe ser menor que 3 metros');
    }
    if (peso < 1) {
      throw new Error('El peso debe ser mayor o igual a 1 kg');
    }
    if (peso > 500) {
      throw new Error('El peso debe ser menor o igual a 500 kg');
    }
    if (!/^\d+(\.\d{1,2})?$/.test(altura.toString())) {
      throw new Error('La altura debe tener como máximo 2 decimales');
    }
    if (!/^\d+(\.\d{1,2})?$/.test(peso.toString())) {
      throw new Error('El peso debe tener como máximo 2 decimales');
    }

    const imc = peso / (altura * altura);
    const imcRedondeado = Math.round(imc * 100) / 100; // Dos decimales

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

    return { imc: imcRedondeado, categoria };
  }
}

