declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'DEVELOPMENT' | 'PRODUCTION' | 'TEST';
      PORT: string;
      DB_URL: string;
    }
  }
}

export {};
