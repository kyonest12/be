import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UncaughtExceptionFilter } from './exceptions/uncaught-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { AppExceptionFilter } from './exceptions/app-exception.filter';
import { DatabaseExceptionFilter } from './exceptions/database-exception.filter';
import { UnauthorizedExceptionFilter } from './exceptions/unauthorized-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppException } from './exceptions/app.exception';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            exceptionFactory: (errors) => {
                const results = errors.map((error) => ({
                    wrong_input: error.property,
                    message: error.constraints,
                }));
                return new AppException(1003, 400, results);
            },
        }),
    );

    app.useGlobalFilters(new UncaughtExceptionFilter());
    app.useGlobalFilters(new UnauthorizedExceptionFilter());
    app.useGlobalFilters(new DatabaseExceptionFilter());
    app.useGlobalFilters(new AppExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());

    const config = new DocumentBuilder()
        .setTitle('API document')
        .setDescription('API document for SNS app')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/', app, document, {
        swaggerOptions: {
            docExpansion: 'none',
            defaultModelExpandDepth: 1000,
            defaultModelsExpandDepth: 1000,
        },
    });

    await app.listen(Number(process.env.PORT) || 3000);
}
bootstrap();
