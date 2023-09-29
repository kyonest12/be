import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUser } from './decorators/user.decorator';
import { User } from '../database/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UserGuard } from './guards/user.guard';

@Controller('/')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signup(@Body() body: SignupDto) {
        return this.authService.signup(body);
    }

    @Post('/login')
    async login(@Body() body: LoginDto) {
        return this.authService.login(body);
    }

    @Get('/profile')
    @UseGuards(UserGuard)
    async getProfile(@AuthUser() user: User) {
        return user;
    }
}
