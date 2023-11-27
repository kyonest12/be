import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    console.log("_______________________________________________");
    console.log(req.user);
    console.log("_______________________________________________");
    return req.user;
});
