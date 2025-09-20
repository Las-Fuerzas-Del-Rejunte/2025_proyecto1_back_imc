import 'express';

interface SupabaseJwtUser {
  sub: string;
  email?: string;
  role?: string;
  [key: string]: any;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: SupabaseJwtUser;
  }
}
