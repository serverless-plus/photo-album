declare namespace NodeJS {
  interface ProcessEnv {
    REGION: string;
    TENCENT_APP_ID: string;
    TENCENT_SECRET_ID: string;
    TENCENT_SECRET_KEY: string;
    BUCKET: string;
  }
}
