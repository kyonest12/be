import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AuthUser } from '../../auth/decorators/user.decorator';
import { User } from '../../database/entities/user.entity';
import { SettingsService } from './settings.service';
import { SetDevtokenDto } from './dto/set-devtoken.dto';

@Controller('settings')
@ApiTags('Settings')
@Auth()
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Post('/set_devtoken')
    @HttpCode(200)
    @ApiBody({ type: SetDevtokenDto })
    async setDevToken(@AuthUser() user: User, @Body() body: SetDevtokenDto) {
        return this.settingsService.setDevtoken(user, body);
    }
}
