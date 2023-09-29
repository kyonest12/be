import { ArgumentsHost, Catch, ExceptionFilter, UnauthorizedException } from '@nestjs/common';
import { errorMessages } from '../constants/errorMessages.constants';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
    async catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        res.status(exception.getStatus()).json({
            code: 9998,
            message: errorMessages[9998],
        });
    }
}
