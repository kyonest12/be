import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AuthUser } from '../../auth/decorators/user.decorator';
import { User } from '../../database/entities/user.entity';
import { SettingsService } from './settings.service';
import { SetDevtokenDto } from './dto/set-devtoken.dto';
import { BuyCoinsDto } from './dto/buy_coins.dto';
import { SetPushSettingsDto } from './dto/set-push-settings';

@Controller('settings')
@ApiTags('Settings')
@Auth()
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Post('/set_devtoken')
    @HttpCode(200)
    async setDevToken(@AuthUser() user: User, @Body() body: SetDevtokenDto) {
        return this.settingsService.setDevtoken(user, body);
    }

    @Post('/buy_coins')
    @HttpCode(200)
    async buyCoins(@AuthUser() user: User, @Body() body: BuyCoinsDto) {
        return this.settingsService.buyCoins(user, body);
    }

    @Post('/get_push_settings')
    @HttpCode(200)
    async getPushSettings(@AuthUser() user: User) {
        return this.settingsService.getPushSettings(user);
    }

    @Post('/set_push_settings')
    @HttpCode(200)
    async setPushSettings(@AuthUser() user: User, @Body() body: SetPushSettingsDto) {
        return this.settingsService.setPushSettings(user, body);
    }
}
