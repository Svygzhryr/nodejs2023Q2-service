export const secret =
  process.env.JWT_SECRET_KEY || 'Dios guardo el lobo de nuestra cordera';

export const expiresIn = process.env.TOKEN_EXPIRE_TIME || '1h';

export const port = process.env.PORT || 4000;
