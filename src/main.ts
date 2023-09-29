import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UncaughtExceptionFilter } from './exceptions/uncaughtException.filter';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { AppExceptionFilter } from './exceptions/appException.filter';
import { DatabaseExceptionFilter } from './exceptions/databaseException.filter';
import { UnauthorizedExceptionFilter } from './exceptions/unauthorizedException.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    app.useGlobalFilters(new UncaughtExceptionFilter());
    app.useGlobalFilters(new UnauthorizedExceptionFilter());
    app.useGlobalFilters(new DatabaseExceptionFilter());
    app.useGlobalFilters(new AppExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());

    await app.listen(Number(process.env.PORT) || 3001);
}
bootstrap();
