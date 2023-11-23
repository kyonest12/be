import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DevToken } from 'src/database/entities/dev-token.entity';
import { User } from '../../database/entities/user.entity';
import { PushSettings } from '../../database/entities/push-settings.entity';
import { SetDevtokenDto } from './dto/set-devtoken.dto';
import { BuyCoinsDto } from './dto/buy_coins.dto';
import { SetPushSettingsDto } from './dto/set-push-settings';

@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(DevToken)
        private devTokenRepo: Repository<DevToken>,
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(PushSettings)
        private pushSettingsRepo: Repository<PushSettings>,
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
    async setPushSettings(user: User, body: SetPushSettingsDto) {
        let pushSettings = await this.pushSettingsRepo.findOneBy({ userId: user.id });

        if (!pushSettings) {
            pushSettings = new PushSettings({ userId: user.id });
            await this.pushSettingsRepo.save(pushSettings);
        }

        pushSettings.likeComment = body.like_comment;
        pushSettings.fromFriends = body.from_friends;
        pushSettings.friendRequests = body.requested_friend;
        pushSettings.suggestedFriends = body.suggested_frined;
        pushSettings.birthdays = body.birthday;
        pushSettings.videos = body.video;
        pushSettings.reports = body.report;
        pushSettings.soundOn = body.sound_on;
        pushSettings.notificationOn = body.notification_on;
        pushSettings.vibrationOn = body.vibrant_on;
        pushSettings.ledOn = body.led_on;

        return {};
    }

    async getPushSettings(user: User) {
        let pushSettings = await this.pushSettingsRepo.findOneBy({ userId: user.id });

        if (!pushSettings) {
            pushSettings = new PushSettings({ userId: user.id });
            await this.pushSettingsRepo.save(pushSettings);
        }

        return {
            like_comment: pushSettings.likeComment ? '1' : '0',
            from_friends: pushSettings.fromFriends ? '1' : '0',
            requested_friend: pushSettings.friendRequests ? '1' : '0',
            suggested_friend: pushSettings.suggestedFriends ? '1' : '0',
            birthday: pushSettings.birthdays ? '1' : '0',
            video: pushSettings.videos ? '1' : '0',
            report: pushSettings.reports ? '1' : '0',
            sound_on: pushSettings.soundOn ? '1' : '0',
            notification_on: pushSettings.notificationOn ? '1' : '0',
            vibrant_on: pushSettings.vibrationOn ? '1' : '0',
            led_on: pushSettings.ledOn ? '1' : '0',
        };
    }
}
