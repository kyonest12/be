import { Controller, Get, Post, HttpCode, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
import { ExampleSuccessResponse } from '../../utils/example-response.decorator';
import { AuthUser } from '../../auth/decorators/user.decorator';
import { User } from '../../database/entities/user.entity';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ChangeProfileAfterSignupDto, avatarValidation } from './dto/change-profile-after-signup.dto';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';

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
        username: 'string | null',
        avatar: 'string | null',
        coins: 0,
    })
    async getProfile(@AuthUser() user: User) {
        return user;
    }

    @Post('/change_profile_after_signup')
    @ApiConsumes('multipart/form-data')
    @ExampleSuccessResponse({
        id: 1,
        email: 'example@email.com',
        status: -1,
        username: 'string | null',
        avatar: 'string | null',
        coins: 0,
    })
    @UseInterceptors(FileInterceptor('avatar'))
    @HttpCode(200)
    async changeProfileAfterSignup(
        @AuthUser() user: User,
        @Body() body: ChangeProfileAfterSignupDto,
        @UploadedFile(avatarValidation) file: Express.Multer.File,
    ) {
        return this.profileService.changeProfileAfterSignup(user, body, file);
    }
}
