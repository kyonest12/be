import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { errorMessages } from '../constants/error-messages.constants';

@Catch()
export class UncaughtExceptionFilter implements ExceptionFilter {
    async catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();

        console.error('uncaught');
        console.error(exception);

        res.status(500).json({
            code: 1005,
            message: errorMessages[1005],
            error: exception.response,
        });
    }
}
