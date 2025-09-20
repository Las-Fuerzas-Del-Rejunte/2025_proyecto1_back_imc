import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CustomSupabaseStrategy } from './custom-supabase.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'supabase' })],
  providers: [CustomSupabaseStrategy],
  exports: [CustomSupabaseStrategy],
})
export class AuthModule {}
