import 'dotenv/config';

export class Config {
  public readonly port: string | number = process.env.PORT || 8081;
  public readonly databaseUrl: string = process.env.DATABASE_URL;
  public readonly mongodbUrl: string = process.env.MONGODB_URL;
  public readonly apiPrefix: string = process.env.API_PREFIX;
  public readonly jwtSecret: string = process.env.JWT_SECRET;
  public readonly jwtExpiresIn: string = process.env.JWT_EXPIRES_IN;
  public readonly refreshTokenExpiresIn: string =
    process.env.REFRESH_TOKEN_EXPIRES_IN;
}

export default new Config();
