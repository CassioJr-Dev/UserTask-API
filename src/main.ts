import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //define uma lista com as propriedades aceitadas
      forbidNonWhitelisted: true, // recusar requisições de propriedades nao encontradas na lista acima
      transform: true, // transforma os dados da requisição de acordo com o dto
    }),
  );

  await app.listen(process.env.PORT);
  console.log(`Servidor rodando da porta ${process.env.PORT}`);
}
bootstrap();
