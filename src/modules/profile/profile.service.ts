import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { InjectRepository } from 'typeorm';
import { ChangeProfileAfterSignupDto } from './dto/change-profile-after-signup.dto';
import { Express } from 'express';

export class ProfileService {
    constructor(
        @InjectRepository(User) 
        private userRepository: UserRepository,
    ) {}

    async changeProfileAfterSignup(user: User, body: ChangeProfileAfterSignupDto, file: Express.Multer.File) {
        user.username = body.username;
        user.avatar = file.path;
        return await this.userRepository.save(user);
    }
}