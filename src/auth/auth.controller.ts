import { Body, Controller, HttpCode, Post, Req, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { User } from 'src/database/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { ExampleResponse, ExampleSuccessResponse } from '../utils/example-response.decorator';
import { AuthUser } from './decorators/user.decorator';

@Controller('/')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    @ExampleResponse(201, {
        id: 1,
        email: 'example@email.com',
        token: 'string',
        status: -1,
        username: null,
        avatar: null,
        coins: 0,
    })
    async signup(@Body() body: SignupDto) {
        return this.authService.signup(body);
    }

    @Post('/login')
    @ExampleSuccessResponse({
        id: 1,
        email: 'example@email.com',
        token: 'string',
        status: -1,
        username: null,
        avatar: null,
        coins: 0,
    })
    @HttpCode(200)
    async login(@Body() body: LoginDto) {
        return this.authService.login(body);
    }
    @Post('/logout')
    async logout(@AuthUser() user: User) {
            return this.authService.logout(user);
    }
    }
   


