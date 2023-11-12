import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserGuard } from '../guards/user.guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function Auth() {
    return applyDecorators(
        UseGuards(UserGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({
            content: {
                json: {
                    example: {
                        code: '9998',
                        message: 'Token is invalid',
                    },
                },
            },
        }),
    );
}
