import { Test, TestingModule } from '@nestjs/testing';
import { ImcService } from '../src/module/imc/imc.service';
import { PrismaService } from '../src/prisma.service';
import { CalcularImcDto } from '../src/module/imc/dto/calcular-imc-dto';

describe('Servicio de IMC', () => {
  let service: ImcService;
  const userId = 'test-user-1';

  let prismaMock: any;

  beforeEach(async () => {
    prismaMock = {
      imc: {
        create: jest.fn().mockImplementation(async ({ data }) => ({
          // conserva lo que manda el servicio (incluye userId)
          ...data,
          id: 1,
          createdAt: new Date(),
        })),
        findMany: jest.fn().mockResolvedValue([]),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImcService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ImcService>(ImcService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería calcular el IMC correctamente', async () => {
    const dto: CalcularImcDto = { altura: 1.75, peso: 70 };
    const result = await service.calcularImc(dto, userId);
    expect(result.resultado).toBe(22.86);
    expect(result.categoria).toBe('Normal');
    expect(prismaMock.imc.create).toHaveBeenCalled();
    // el registro guardado debe incluir el userId
    const call = prismaMock.imc.create.mock.calls[0][0];
    expect(call.data.userId).toBe(userId);
  });

  it('debería retornar "Bajo peso" para IMC < 18.5', async () => {
    const dto: CalcularImcDto = { altura: 1.75, peso: 50 };
    const result = await service.calcularImc(dto, userId);
    expect(result.resultado).toBe(16.33);
    expect(result.categoria).toBe('Bajo peso');
  });

  it('debería retornar "Sobrepeso" para 25 <= IMC < 30', async () => {
    const dto: CalcularImcDto = { altura: 1.75, peso: 80 };
    const result = await service.calcularImc(dto, userId);
    expect(result.resultado).toBe(26.12);
    expect(result.categoria).toBe('Sobrepeso');
  });

  it('debería retornar "Obeso" para IMC >= 30', async () => {
    const dto: CalcularImcDto = { altura: 1.75, peso: 100 };
    const result = await service.calcularImc(dto, userId);
    expect(result.resultado).toBe(32.65);
    expect(result.categoria).toBe('Obeso');
  });

  it('debería lanzar un error si la altura es 0', () => {
    const dto: CalcularImcDto = { altura: 0, peso: 70 };
    return expect(service.calcularImc(dto, userId)).rejects.toThrow();
  });

  it('debería lanzar un error si la altura es undefined', () => {
    const dto: CalcularImcDto = { altura: undefined as any, peso: 70 };
    return expect(service.calcularImc(dto, userId)).rejects.toThrow();
  });

  it('debería lanzar un error si el peso es undefined', () => {
    const dto: CalcularImcDto = { altura: 1.75, peso: undefined as any };
    return expect(service.calcularImc(dto, userId)).rejects.toThrow();
  });

  it('debería lanzar un error si la altura es null', () => {
    const dto: CalcularImcDto = { altura: null as any, peso: 70 };
    return expect(service.calcularImc(dto, userId)).rejects.toThrow();
  });

  it('debería lanzar un error si el peso es null', () => {
    const dto: CalcularImcDto = { altura: 1.75, peso: null as any };
    return expect(service.calcularImc(dto, userId)).rejects.toThrow();
  });

  it('debería lanzar un error si la altura es menor a 0.01', () => {
    const dto: CalcularImcDto = { altura: 0.009, peso: 70 };
    return expect(service.calcularImc(dto, userId)).rejects.toThrow();
  });

  it('debería lanzar un error si la altura es >= 3', () => {
    const dto: CalcularImcDto = { altura: 3, peso: 70 };
    return expect(service.calcularImc(dto, userId)).rejects.toThrow();
  });

  it('debería lanzar un error si el peso es menor a 1', () => {
    const dto: CalcularImcDto = { altura: 1.75, peso: 0.99 };
    return expect(service.calcularImc(dto, userId)).rejects.toThrow();
  });

  it('debería lanzar un error si el peso es mayor a 500', () => {
    const dto: CalcularImcDto = { altura: 1.75, peso: 501 };
    return expect(service.calcularImc(dto, userId)).rejects.toThrow();
  });

  it('debería lanzar un error si la altura tiene más de 2 decimales', () => {
    const dto: CalcularImcDto = { altura: 1.234, peso: 70 };
    return expect(service.calcularImc(dto, userId)).rejects.toThrow();
  });

  it('debería lanzar un error si el peso tiene más de 2 decimales', () => {
    const dto: CalcularImcDto = { altura: 1.75, peso: 70.123 };
    return expect(service.calcularImc(dto, userId)).rejects.toThrow();
  });

  it('debería consultar el historial en menos de 100ms', async () => {
    const t0 = Date.now();
    const res = await service.historial(userId);
    const t1 = Date.now();
    expect(Array.isArray(res)).toBe(true);
    expect(prismaMock.imc.findMany).toHaveBeenCalled();
    expect(t1 - t0).toBeLessThan(100);
  });
});
