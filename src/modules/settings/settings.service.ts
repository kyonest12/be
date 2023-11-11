import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DevToken } from 'src/database/entities/dev-token.entity';
import { DevTokenType } from 'src/constants/dev-token-type.enum';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(DevToken)
        private devTokenRepository: Repository<DevToken>,
    ) {}

    async setDevtoken(user: User, devtype: DevTokenType, devtoken: string) {
        const existingDevToken = await this.devTokenRepository.findOne({ where: { devtoken, userId: user.id } });

        if (existingDevToken) {
            existingDevToken.devtype = devtype;
            existingDevToken.devtoken = devtoken;
            await this.devTokenRepository.save(existingDevToken);
        } else {
            const newDevToken = new DevToken({
                userId: user.id,
                devtype: devtype,
                devtoken: devtoken,
            });
            await this.devTokenRepository.save(newDevToken);
        }
    }
}
