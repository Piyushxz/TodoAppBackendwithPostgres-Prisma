declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        DATABASE_URL: string;
        SECRET_KEY: string;
    }
}
