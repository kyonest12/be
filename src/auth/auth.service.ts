import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { AccountStatus } from '../constants/account-status.enum';
import { User } from '../database/entities/user.entity';
import { AppException } from '../exceptions/app.exception';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { jwtSignOptions } from '../constants/jst-sign-options.constant';
import { generateVerifyCode } from '../utils/generate-verify-code.util';
import { MailerService } from '@nestjs-modules/mailer';
import { VerifyCode } from '../database/entities/verify-code.entity';
import { VerifyCodeStatus } from '../constants/verify-code-status.enum';
import dayjs from '../utils/dayjs.util';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private mailerService: MailerService,
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(VerifyCode)
        private verifyCodeRepo: Repository<VerifyCode>,
    ) {}

    async hashPassword(password: string) {
        return hash(password, 10);
    }

    async comparePassword(user: User, password: string) {
        return compare(password, user.password);
    }

    async doesEmailExist(email: string) {
        return this.userRepo.findOneBy({ email });
    }

    async signup({ email, password }: SignupDto) {
        if (await this.doesEmailExist(email)) {
            throw new AppException(9996);
        }

        if (password.indexOf(email) !== -1) {
            throw new AppException(9995);
        }

        const user = new User({
            email: email.toLowerCase(),
            password: await this.hashPassword(password),
            status: AccountStatus.Inactive,
            coins: 50,
        });
        await this.userRepo.save(user);
        return this.getVerifyCode(email);
    }

    async login({ email, password, uuid: device_id }: LoginDto) {
        const user = await this.userRepo.findOne({
            where: { email: email.toLowerCase() },
        });

        if (!user || !(await this.comparePassword(user, password))) {
            throw new AppException(9991, 403);
        }

        user.token = this.jwtService.sign({ id: user.id, device_id }, jwtSignOptions);
        await this.userRepo.save(user);

        return {
            id: String(user.id),
            username: user.username || '',
            token: user.token,
            avatar: user.avatar || '',
            active: String(user.status),
            coins: String(user.coins),
        };
    }

    async changePassword(user: User, { password, new_password }: ChangePasswordDto) {
        if (!(await this.comparePassword(user, password))) {
            throw new AppException(9990);
        }

        if (password.indexOf(user.email) !== -1) {
            throw new AppException(9995);
        }

        user.password = await this.hashPassword(new_password);
        user.token = this.jwtService.sign({ id: user.id, device_id: generateVerifyCode(6) }, jwtSignOptions);
        await this.userRepo.save(user);

        return {
            token: user.token,
        };
    }

    async logout(user: User) {
        user.token = null;
        await this.userRepo.save(user);

        return {};
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.userRepo.findOne({
            where: {
                id,
            },
        });

        if (!user || user?.status === AccountStatus.Inactive) {
            throw new AppException(9995);
        }

        return user;
    }

    async getVerifyCode(email: string) {
        const user = await this.userRepo.findOneBy({ email });
        if (!user) {
            throw new AppException(9995);
        }
        const code = generateVerifyCode(6);
        const verifyCode = new VerifyCode({
            user,
            code,
            expiredAt: dayjs().add(30, 'minutes').toDate(),
        });

        await this.verifyCodeRepo.update({ userId: user.id }, { status: VerifyCodeStatus.Inactive });
        await this.verifyCodeRepo.save(verifyCode);
        await this.mailerService.sendMail({
            to: email,
            subject: 'Verify code',
            text: `This is your verify code ${code} `,
        });

        return {
            verify_code: String(code),
        };
    }

    async verifyCode(email: string, code: string) {
        const verifyCode = await this.verifyCodeRepo.findOne({
            where: {
                status: VerifyCodeStatus.Active,
                user: {
                    email,
                },
                code,
                expiredAt: MoreThan(new Date()),
            },
            relations: ['user'],
        });
        if (!verifyCode) {
            throw new AppException(9993);
        }

        verifyCode.status = VerifyCodeStatus.Inactive;
        return this.verifyCodeRepo.save(verifyCode);
    }

    async checkVerifyCode(email: string, code: string) {
        const verifyCode = await this.verifyCode(email, code);

        const user = verifyCode.user;
        if (user.status === AccountStatus.Inactive) {
            user.status = AccountStatus.Pending;
            await this.userRepo.save(user);
        }

        return {
            id: String(user.id),
            active: String(user.status),
        };
    }

    async resetPassword(email: string, code: string, password: string) {
        const verifyCode = await this.verifyCode(email, code);

        const user = verifyCode.user;
        user.password = await this.hashPassword(password);
        user.token = null;
        await this.userRepo.save(user);

        return {};
    }
}
