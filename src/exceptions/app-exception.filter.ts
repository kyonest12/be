import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AppException } from './app.exception';

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
    async catch(exception: AppException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        res.status(exception.getStatus()).json(exception.getResponse());
    }
}
