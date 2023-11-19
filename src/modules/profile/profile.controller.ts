import { Controller, Post, HttpCode, UploadedFiles, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AuthUser } from '../../auth/decorators/user.decorator';
import { User } from '../../database/entities/user.entity';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ChangeProfileAfterSignupDto, avatarValidation } from './dto/change-profile-after-signup.dto';
import { ProfileService } from './profile.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { GetUserInfoDto } from './dto/get-user-info.dto';
import { SetUserInfoDto, userInfoValidation } from './dto/set-user-info.dto';

@Controller()
@ApiTags('Profile')
@Auth()
export class ProfileController {
    constructor(private profileService: ProfileService) {}

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

    @Post('/get_user_info')
    async getUserInfo(@AuthUser() user: User, @Body() body: GetUserInfoDto) {
        return this.profileService.getUserInfo(user, body);
    }

    @Post('/set_user_info')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'avatar', maxCount: 1 },
            { name: 'cover_image', maxCount: 1 },
        ]),
    )
    async setUserInfo(
        @AuthUser() user: User,
        @Body() body: SetUserInfoDto,
        @UploadedFiles(userInfoValidation) { avatar, cover_image },
    ) {
        return this.profileService.setUserInfo(user, body, avatar, cover_image);
    }
}
