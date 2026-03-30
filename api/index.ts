import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import serverless from 'serverless-http';
import { connectDB } from '../src/lib/mongodb'; // ✅ import DB connection

let server: any;

async function bootstrap() {
  // ✅ Ensure DB is connected BEFORE app starts
  await connectDB();

  const app = await NestFactory.create(AppModule);

  // ✅ (optional but recommended)
  app.setGlobalPrefix('api');

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

export default async function handler(req: any, res: any) {
  if (!server) {
    server = await bootstrap();
  }

  return server(req, res);
}