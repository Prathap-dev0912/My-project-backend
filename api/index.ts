import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import serverless from 'serverless-http';

let cachedHandler;

async function createHandler() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      "http://localhost:3000",
      "https://my-project-nine-omega-42.vercel.app",
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();

  return serverless(expressApp);
}

export const handler = async (event, context) => {
  if (!cachedHandler) {
    cachedHandler = await createHandler();
  }
  return cachedHandler(event, context);
};