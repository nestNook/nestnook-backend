import 'dotenv/config';

export class Config {
  public readonly port: string | number = process.env.PORT || 8081;
  public readonly databaseUrl: string = String(process.env.DATABASE_URL);
}

export default new Config();
