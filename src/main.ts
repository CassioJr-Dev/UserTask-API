import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('UserTask')
  .setDescription('User task planning API')
  .setVersion('1.0')
  .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('documentation', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  await app.listen(process.env.PORT);
  console.log(`Server running on port ${process.env.PORT}`);
}
bootstrap();
