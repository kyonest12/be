import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class DatabaseExceptionFilter implements ExceptionFilter {
    async catch(exception: TypeORMError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        console.error(exception);
        res.status(400).json({
            code: '5001',
            message: 'Database exception',
            error: exception,
        });
    }
}
