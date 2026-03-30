import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  
  const app = await NestFactory.create(AppModule);

  app.enableCors({
  origin: [
    "http://localhost:3000", // local frontend
    "https://my-project-nine-omega-42.vercel.app", // your deployed frontend
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});

  const port = process.env.PORT ?? 5000;


  app.setGlobalPrefix('api');
  // await app.listen(port);

  // console.log(`🚀 Server running on: http://localhost:${port}`);

}
bootstrap();





