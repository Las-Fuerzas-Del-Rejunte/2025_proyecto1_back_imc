import { UnauthorizedException } from '@nestjs/common';
import { CustomSupabaseStrategy } from '../src/auth/custom-supabase.strategy';
import { ConfigService } from '@nestjs/config';

jest.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    auth: {
      getUser: jest.fn(async (token: string) => {
        if (token === 'valid') {
          return { data: { user: { id: 'u1', email: 'u@a.com' } }, error: null };
        }
        return { data: { user: null }, error: new Error('invalid') };
      }),
    },
  }),
}));

describe('CustomSupabaseStrategy', () => {
  const configMock = {
    get: (k: string) => (k.includes('URL') ? 'https://x.supabase.co' : 'key'),
  } as unknown as ConfigService;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // silencia errores en este spec
  });
  afterAll(() => {
    (console.error as any).mockRestore?.();
  });

  it('devuelve usuario con token válido', async () => {
    const s = new CustomSupabaseStrategy(configMock);
    const req = { headers: { authorization: 'Bearer valid' } } as any;
    const user = await s.validate(req);
    expect(user).toMatchObject({ id: 'u1' });
  });

  it('lanza si falta Authorization', async () => {
    const s = new CustomSupabaseStrategy(configMock);
    const req = { headers: {} } as any;
    await expect(s.validate(req)).rejects.toThrow(UnauthorizedException);
  });

  it('lanza con token inválido', async () => {
    const s = new CustomSupabaseStrategy(configMock);
    const req = { headers: { authorization: 'Bearer bad' } } as any;
    await expect(s.validate(req)).rejects.toThrow(UnauthorizedException);
  });

  it('lanza si token está vacío', async () => {
    const s = new CustomSupabaseStrategy(configMock);
    const req = { headers: { authorization: 'Bearer ' } } as any;
    await expect(s.validate(req)).rejects.toThrow(UnauthorizedException);
  });

  it('lanza si el esquema no es Bearer', async () => {
    const s = new CustomSupabaseStrategy(configMock);
    const req = { headers: { authorization: 'Basic abc123' } } as any;
    await expect(s.validate(req)).rejects.toThrow(UnauthorizedException);
  });
});