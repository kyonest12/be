import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DevToken } from '../../database/entities/dev-token.entity';
import { User } from '../../database/entities/user.entity';
import { SetDevtokenDto } from './dto/set-devtoken.dto';
import { BuyCoinsDto } from './dto/buy_coins.dto';

@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(DevToken)
        private devTokenRepo: Repository<DevToken>,
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}

    async setDevtoken(user: User, body: SetDevtokenDto) {
        const existingDevToken = await this.devTokenRepo.findOne({ where: { userId: user.id } });

        if (existingDevToken) {
            existingDevToken.type = body.devtype;
            existingDevToken.token = body.devtoken;
            await this.devTokenRepo.save(existingDevToken);
        } else {
            const newDevToken = new DevToken({
                userId: user.id,
                type: body.devtype,
                token: body.devtoken,
            });
            await this.devTokenRepo.save(newDevToken);
        }

        return {};
    }

    async buyCoins(user: User, { coins }: BuyCoinsDto) {
        user.coins += coins;

        await this.userRepo.save(user);

        return { coins: user.coins };
    }
}
