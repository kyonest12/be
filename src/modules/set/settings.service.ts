import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DevToken } from 'src/database/entities/dev-token.entity';
import { DevTokenType } from 'src/constants/dev-token-type.enum';

@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(DevToken)
        private devTokenRepository: Repository<DevToken>,
    ) {}

    async setDevtoken(token: string, devtype: DevTokenType, devtoken: string): Promise<void> {
        // Kiểm tra và đảm bảo rằng devtype hợp lệ (ví dụ: là một trong các giá trị trong DevTokenType)

        // ... Kiểm tra và xử lý devtype ...

        const existingDevToken = await this.devTokenRepository.findOne({ where: { token } });

        if (existingDevToken) {
            existingDevToken.type = devtype;
            existingDevToken.token = devtoken;
            await this.devTokenRepository.save(existingDevToken);
        } else {
            const newDevToken = this.devTokenRepository.create();
            newDevToken.token = token;
            newDevToken.type = devtype;
            newDevToken.token = devtoken;
            await this.devTokenRepository.save(newDevToken);
        }
    }
}
