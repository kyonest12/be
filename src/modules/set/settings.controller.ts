import { Controller, Post, Body } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { DevTokenType } from 'src/constants/dev-token-type.enum';

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Post('dev_token')
    async setDevToken(
        @Body('token') token: string,
        @Body('devtype') devtype: DevTokenType,
        @Body('devtoken') devtoken: string,
    ): Promise<void> {
        await this.settingsService.setDevtoken(token, devtype, devtoken);
    }
}
