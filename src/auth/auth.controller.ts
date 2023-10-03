import { Body, Controller, HttpCode, Post, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { ApiTags } from '@nestjs/swagger';
import { ExampleResponse, ExampleSuccessResponse } from '../utils/example-response.decorator';
import { GetVerifyCodeDto } from './dto/get-verify-code.dto';
import { CheckVerifyCodeDto } from './dto/check-verify-code.dto';

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

    @Get('/get_verify_code')
    @ExampleSuccessResponse({
        email: 'example@email.com',
        code: '123456',
        expired: '10',
    })
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
    async checkVerifyCode(@Body() body: CheckVerifyCodeDto) {
        return this.authService.checkVerifyCode(body.email, body.code);
    }
}
