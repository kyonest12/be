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

    async signup({ email, password, device_id }: SignupDto) {
        if (await this.doesEmailExist(email)) {
            throw new AppException(9996);
        }

        if (password.indexOf(email) != -1) {
            throw new AppException(9995);
        }

        const user = new User({
            email,
            password: await this.hashPassword(password),
        });
        await this.userRepo.save(user);

        return this.login({ email, password, device_id });
    }

    async login({ email, password, device_id }: LoginDto) {
        const user = await this.userRepo.findOne({
            where: {
                email: email.toLowerCase(),
            },
        });

        if (!user || !(await this.comparePassword(user, password))) {
            throw new AppException(9995); // todo
        }

        if (user.status === AccountStatus.INACTIVE) {
            throw new AppException(9995);
        }

        user.token = this.jwtService.sign({ id: user.id, device_id }, jwtSignOptions);

        await this.userRepo.save(user);

        return { ...user.toJSON(), token: user.token };
    }
    async logout(user: User) {
        user.token = null;
        await this.userRepo.save(user);
    }
    async getUserById(id: number): Promise<User> {
        const user = await this.userRepo.findOne({
            where: {
                id,
            },
        });

        if (!user || user?.status === AccountStatus.INACTIVE) {
            throw new AppException(9995);
        }

        return user;
    }
    async changePassword(user: User, { oldPassword, newPassword }) {
        if (!user || !(await this.comparePassword(user, oldPassword))) {
            throw new AppException(9995);
        }
        user.password = await hash(newPassword, 10);
        await this.userRepo.save(user);

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
            expired_at: dayjs().add(30, 'minutes').toDate(),
        });

        await this.verifyCodeRepo.update({ user_id: user.id }, { status: VerifyCodeStatus.INACTIVE });
        await this.verifyCodeRepo.save(verifyCode);
        await this.mailerService.sendMail({
            to: email,
            subject: 'Verify code',
            text: `This is your verify code ${code} `,
        });

        return {};
    }

    async verifyCode(email: string, code: string) {
        const verifyCode = await this.verifyCodeRepo.findOne({
            where: {
                status: VerifyCodeStatus.ACTIVE,
                user: {
                    email,
                },
                code,
                expired_at: MoreThan(new Date()),
            },
            relations: ['user'],
        });
        if (!verifyCode) {
            throw new AppException(9993);
        }

        verifyCode.status = VerifyCodeStatus.INACTIVE;
        return this.verifyCodeRepo.save(verifyCode);
    }

    async checkVerifyCode(email: string, code: string) {
        const verifyCode = await this.verifyCode(email, code);

        const user = verifyCode.user;
        user.token = this.jwtService.sign({ id: user.id, code }, { secret: process.env.JWT_SECRET, expiresIn: '30m' });
        await this.userRepo.save(user);

        return {
            ...user,
            token: user.token,
        };
    }

    async resetPassword(email: string, code: string, password: string) {
        const verifyCode = await this.verifyCode(email, code);

        const user = verifyCode.user;
        user.password = await this.hashPassword(password);
        user.token = null;

        return this.userRepo.save(user);
    }
}
