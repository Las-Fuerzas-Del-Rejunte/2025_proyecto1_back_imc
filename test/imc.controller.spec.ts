import { Test, TestingModule } from '@nestjs/testing';
import { ImcController } from '../src/module/imc/imc.controller';
import { ImcService } from '../src/module/imc/imc.service';
import { CalcularImcDto } from '../src/module/imc/dto/calcular-imc-dto';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

describe('ImcController', () => {
  let controller: ImcController;
  let service: ImcService;
  const userId = 'test-user-1';
  const req = { user: { id: userId } } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImcController],
      providers: [
        {
          provide: ImcService,
          useValue: {
            calcularImc: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ImcController>(ImcController);
    service = module.get<ImcService>(ImcService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería retornar el IMC y la categoría para una entrada válida', async () => {
    const dto: CalcularImcDto = { altura: 1.75, peso: 70 };
    jest.spyOn(service, 'calcularImc').mockResolvedValue({
      peso: dto.peso,
      altura: dto.altura,
      resultado: 22.86,
      categoria: 'Normal',
      createdAt: new Date(),
      userId,
      id: 1,
    } as any);

    const result = await controller.calcular(dto, req);
    expect(result.resultado).toBe(22.86);
    expect(result.categoria).toBe('Normal');
    expect(service.calcularImc).toHaveBeenCalledWith(dto, userId);
  });

  it('debería lanzar BadRequestException para una entrada inválida', async () => {
    const dtoInvalido: CalcularImcDto = { altura: -1, peso: 70 };

    // Aplicar ValidationPipe manualmente en la prueba
    const validationPipe = new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true });

    await expect(validationPipe.transform(dtoInvalido, { type: 'body', metatype: CalcularImcDto }))
      .rejects.toThrow(BadRequestException);

    // Verificar que el servicio no se llama porque la validación falla antes
    expect(service.calcularImc).not.toHaveBeenCalled();
  });

  it('debería calcular el IMC correctamente con más de dos decimales', async () => {
    const dto: CalcularImcDto = { altura: 1.75555, peso: 70.12345 };
    jest.spyOn(service, 'calcularImc').mockResolvedValue({
      peso: dto.peso,
      altura: dto.altura,
      resultado: 22.76,
      categoria: 'Normal',
      createdAt: new Date(),
      userId,
      id: 1,
    } as any);

    const result = await controller.calcular(dto, req);
    expect(result.resultado).toBe(22.76);
    expect(result.categoria).toBe('Normal');
    expect(service.calcularImc).toHaveBeenCalledWith(dto, userId);
  });

  it('debería integrarse correctamente con el servicio en caso límite', async () => {
    const dto: CalcularImcDto = { altura: 1.6, peso: 100 };
    jest.spyOn(service, 'calcularImc').mockResolvedValue({
      peso: dto.peso,
      altura: dto.altura,
      resultado: 39.06,
      categoria: 'Obeso',
      createdAt: new Date(),
      userId,
      id: 1,
    } as any);

    const resultado = await controller.calcular(dto, req);
    expect(resultado.resultado).toBe(39.06);
    expect(resultado.categoria).toBe('Obeso');
    expect(service.calcularImc).toHaveBeenCalledWith(dto, userId);
  });
});
