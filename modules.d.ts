declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    MONGO_URI: string;
    JWT_SECRET: string;
    JWT_LIFE_TIME: string;
  }
}