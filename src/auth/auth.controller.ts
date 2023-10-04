import { Body, Controller, HttpCode, Post, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { User } from '../database/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { ExampleResponse, ExampleSuccessResponse } from '../utils/example-response.decorator';
import { GetVerifyCodeDto } from './dto/get-verify-code.dto';
import { CheckVerifyCodeDto } from './dto/check-verify-code.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
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

    @Get('/get_verify_code')
    @ExampleSuccessResponse({})
    async getVerifyCode(@Query() query: GetVerifyCodeDto) {
        return this.authService.getVerifyCode(query.email);
    }

    @Post('/check_verify_code')
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
    async checkVerifyCode(@Body() { email, code }: CheckVerifyCodeDto) {
        return this.authService.checkVerifyCode(email, code);
    }

    @Post('/reset_password')
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
    async resetPassword(@Body() { email, code, password }: ResetPasswordDto) {
        return this.authService.resetPassword(email, code, password);
    }
}
