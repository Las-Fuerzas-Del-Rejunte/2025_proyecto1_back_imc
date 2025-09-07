import { Test, TestingModule } from "@nestjs/testing";
import { ImcService } from "./imc.service";
import { CalcularImcDto } from "./dto/calcular-imc-dto";

describe('ImcService', () => {
  let service: ImcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImcService],
    }).compile();

    service = module.get<ImcService>(ImcService);
  });

  // Test unitario: verifica que el servicio se haya creado correctamente
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test unitario: valida el cálculo correcto del IMC y la categoría "Normal"
  it('should calculate IMC correctly', () => {
    const dto: CalcularImcDto = { altura: 1.75, peso: 70 };
    const result = service.calcularImc(dto);
    expect(result.imc).toBeCloseTo(22.86, 2); // Redondeado a 2 decimales
    expect(result.categoria).toBe('Normal');
  });

  // Test unitario: valida que la categoría sea "Bajo peso" para IMC < 18.5
  it('should return Bajo peso for IMC < 18.5', () => {
    const dto: CalcularImcDto = { altura: 1.75, peso: 50 };
    const result = service.calcularImc(dto);
    expect(result.imc).toBeCloseTo(16.33, 2);
    expect(result.categoria).toBe('Bajo peso');
  });

  // Test unitario: valida que la categoría sea "Sobrepeso" para 25 <= IMC < 30
  it('should return Sobrepeso for 25 <= IMC < 30', () => {
    const dto: CalcularImcDto = { altura: 1.75, peso: 80 };
    const result = service.calcularImc(dto);
    expect(result.imc).toBeCloseTo(26.12, 2);
    expect(result.categoria).toBe('Sobrepeso');
  });

  // Test unitario: valida que la categoría sea "Obeso" para IMC >= 30
  it('should return Obeso for IMC >= 30', () => {
    const dto: CalcularImcDto = { altura: 1.75, peso: 100 };
    const result = service.calcularImc(dto);
    expect(result.imc).toBeCloseTo(32.65, 2);
    expect(result.categoria).toBe('Obeso');
  });

  // Test unitario: valida que se lance error si la altura es cero
  it('should throw an error if altura is 0', () => {
    const dto: CalcularImcDto = { altura: 0, peso: 70 };
    expect(() => service.calcularImc(dto)).toThrowError('La altura debe ser mayor que 0');
  });

  // Test unitario: valida que se lance error si la altura es undefined
  it('should throw an error if altura is undefined', () => {
    const dto: CalcularImcDto = { altura: undefined as any, peso: 70 };
    expect(() => service.calcularImc(dto)).toThrowError('La altura es obligatoria');
  });

  // Test unitario: valida que se lance error si el peso es undefined
  it('should throw an error if peso is undefined', () => {
    const dto: CalcularImcDto = { altura: 1.75, peso: undefined as any };
    expect(() => service.calcularImc(dto)).toThrowError('El peso es obligatorio');
  });

  // Test unitario: valida que se lance error si la altura es null
  it('should throw an error if altura is null', () => {
    const dto: CalcularImcDto = { altura: null as any, peso: 70 };
    expect(() => service.calcularImc(dto)).toThrowError('La altura es obligatoria');
  });

  // Test unitario: valida que se lance error si el peso es null
  it('should throw an error if peso is null', () => {
    const dto: CalcularImcDto = { altura: 1.75, peso: null as any };
    expect(() => service.calcularImc(dto)).toThrowError('El peso es obligatorio');
  });

  // Test unitario: valida que se lance error si la altura es menor a 0.01
  it('should throw an error if altura is less than 0.01', () => {
    const dto: CalcularImcDto = { altura: 0.009, peso: 70 };
    expect(() => service.calcularImc(dto)).toThrowError('La altura debe ser mayor que 0');
  });

  // Test unitario: valida que se lance error si la altura es mayor o igual a 3
  it('should throw an error if altura is greater than or equal to 3', () => {
    const dto: CalcularImcDto = { altura: 3, peso: 70 };
    expect(() => service.calcularImc(dto)).toThrowError('La altura debe ser menor que 3 metros');
  });

  // Test unitario: valida que se lance error si el peso es menor a 1
  it('should throw an error if peso is less than 1', () => {
    const dto: CalcularImcDto = { altura: 1.75, peso: 0.99 };
    expect(() => service.calcularImc(dto)).toThrowError('El peso debe ser mayor o igual a 1 kg');
  });

  // Test unitario: valida que se lance error si el peso es mayor a 500
  it('should throw an error if peso is greater than 500', () => {
    const dto: CalcularImcDto = { altura: 1.75, peso: 501 };
    expect(() => service.calcularImc(dto)).toThrowError('El peso debe ser menor o igual a 500 kg');
  });

  // Test unitario: valida que se lance error si la altura tiene más de 2 decimales
  it('should throw an error if altura has more than 2 decimals', () => {
    const dto: CalcularImcDto = { altura: 1.755, peso: 70 };
    expect(() => service.calcularImc(dto)).toThrowError('La altura debe tener como máximo 2 decimales');
  });

  // Test unitario: valida que se lance error si el peso tiene más de 2 decimales
  it('should throw an error if peso has more than 2 decimals', () => {
    const dto: CalcularImcDto = { altura: 1.75, peso: 70.123 };
    expect(() => service.calcularImc(dto)).toThrowError('El peso debe tener como máximo 2 decimales');
  });

  // Test de integración: valida que la categoría calculada sea válida para integración con otros módulos
  it('should integrate correctly with another module', async () => {
    // Simulación de integración con otro módulo
    const dto: CalcularImcDto = { altura: 1.8, peso: 75 };
    const result = service.calcularImc(dto);

    // Supongamos que otro módulo valida la categoría
    const categoriaValida = ['Bajo peso', 'Normal', 'Sobrepeso', 'Obeso'].includes(result.categoria);
    expect(categoriaValida).toBe(true);
  });
});