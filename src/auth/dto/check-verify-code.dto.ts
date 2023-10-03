import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CheckVerifyCodeDto {
    @ApiProperty({ example: 'example@emial.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    code: string;
}
