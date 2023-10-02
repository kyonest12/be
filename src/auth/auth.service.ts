import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { AccountStatus } from '../constants/account-status.enum';
import { User } from '../database/entities/user.entity';
import { AppException } from '../exceptions/app.exception';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { jwtSignOptions } from '../constants/jst-sign-options.constant';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}

    async hashPassword(user: User) {
        user.password = await hash(user.password, 10);
        return user;
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
            password,
        });

        await this.hashPassword(user);
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
}
