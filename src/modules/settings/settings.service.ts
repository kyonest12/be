import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DevToken } from 'src/database/entities/dev-token.entity';
import { User } from '../../database/entities/user.entity';
import { SetDevtokenDto } from './dto/set-devtoken.dto';

@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(DevToken)
        private devTokenRepository: Repository<DevToken>,
    ) {}

    async setDevtoken(user: User, body: SetDevtokenDto) {
        const existingDevToken = await this.devTokenRepository.findOne({ where: { userId: user.id } });

        if (existingDevToken) {
            existingDevToken.type = body.devtype;
            existingDevToken.token = body.devtoken;
            await this.devTokenRepository.save(existingDevToken);
        } else {
            const newDevToken = new DevToken({
                userId: user.id,
                type: body.devtype,
                token: body.devtoken,
            });
            await this.devTokenRepository.save(newDevToken);
        }

        return {};
    }
}
