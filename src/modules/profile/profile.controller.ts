import { Controller, Get, Post, HttpCode, UploadedFile, UseInterceptors, FileInterceptor } from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
import { ExampleSuccessResponse } from '../../utils/example-response.decorator';
import { AuthUser } from '../../auth/decorators/user.decorator';
import { User } from '../../database/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { ChangeProfileAfterSignupDto } from './dto/change-profile-after-signup.dto';
import { ProfileService } from './profile.service';
import { Express } from 'express';

@Controller()
@ApiTags('Profile')
@Auth()
export class ProfileController {
    constructor(private profileService: ProfileService) {}

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

    @Post('/change_profile_after_signup')
    @ExampleSuccessResponse({
        id: 1,
        email: 'example@email.com',
        status: -1,
        username: 'string',
        avatar: 'string',
        coins: 0,
    })
    @UseInterceptors(FileInterceptor('avatar'))
    @HttpCode(200)
    async changeProfileAfterSignup(@AuthUser() user: User, body: ChangeProfileAfterSignupDto, @UploadedFile() file: Express.Multer.File) {
        return this.profileService.changeProfileAfterSignup(user, body, file)
    }
}
