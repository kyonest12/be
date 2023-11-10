import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { SettingsService } from './settings.service';
import { SetDevtokenDto } from './dto/set-devtoken.dto';

@Controller('settings')
@ApiTags('Settings')
@Auth()
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Post('set_devtoken')
    @HttpCode(200)
    @ApiBody({ type: SetDevtokenDto })
    async setDevToken(@Body() setDevtokenDto: SetDevtokenDto) {
        const { token, devtype, devtoken } = setDevtokenDto;
        return this.settingsService.setDevtoken(token, devtype, devtoken);
    }
}
