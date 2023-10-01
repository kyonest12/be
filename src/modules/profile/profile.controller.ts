import { Controller, Get } from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
import { ExampleSuccessResponse } from '../../utils/example-response.decorator';
import { AuthUser } from '../../auth/decorators/user.decorator';
import { User } from '../../database/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Profile')
@Auth()
export class ProfileController {
    @Get('/get_user_info')
    @ExampleSuccessResponse({
        id: 1,
        email: 'example@email.com',
        status: -1,
        username: null,
        avatar: null,
        coins: 0,
    })
    async getProfile(@AuthUser() user: User) {
        return user;
    }
}
