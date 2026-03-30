import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import serverless from 'serverless-http';

let server: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
  origin: [
    "http://localhost:3000", // local frontend
    "https://my-project-nine-omega-42.vercel.app", // your deployed frontend
  ],
  credentials: true,
});

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverless(expressApp);
}

export default async function handler(req: any, res: any) {
  if (!server) {
    server = await bootstrap();
  }

  return server(req, res); // ✅ keep this
}