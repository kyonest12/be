import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class UserGuard extends AuthGuard('jwt') {
    constructor(private authService: AuthService) {
        super();
    }

    // todo: unauthorized exception filter

    async canActivate(context: ExecutionContext) {
        if (!(await super.canActivate(context))) {
            return false;
        }
        const req = context.switchToHttp().getRequest();
        req.user = await this.authService.getUserById(req.user.id);
        return true;
    }
}
