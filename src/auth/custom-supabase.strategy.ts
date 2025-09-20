import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class CustomSupabaseStrategy extends PassportStrategy(Strategy, 'supabase') {
  private supabase;

  constructor(private config: ConfigService) {
    super();
    this.supabase = createClient(
      this.config.get<string>('SUPABASE_URL')!,
      this.config.get<string>('SUPABASE_KEY')!
    );
    console.log(' [INICIA ACA ALGO] Cliente de Supabase inicializado correctamente');
  }

  async validate(req: Request) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (!token) throw new UnauthorizedException('Token no encontrado en header');

    const { data, error } = await this.supabase.auth.getUser(token);
    if (error || !data?.user) {
      console.error(' ----- Error en getUser:', error);
      throw new UnauthorizedException('Token inválido');
    }

    console.log('------ Usuario autenticado ------:', { id: data.user.id, email: data.user.email });
    return data.user;
  }
}
