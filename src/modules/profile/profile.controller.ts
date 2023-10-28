import { Controller, Post, HttpCode, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
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

    // @Post('/get_user_info')
    // async getProfile(@AuthUser() user: User) {
    //     return user;
    // }

    @Post('/change_profile_after_signup')
    @ApiConsumes('multipart/form-data')
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
