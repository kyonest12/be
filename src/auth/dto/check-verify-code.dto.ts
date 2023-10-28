import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

export class CheckVerifyCodeDto {
    @ApiProperty({ example: 'example@email.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    @Matches(/^\d+/)
    code_verify: string;
}
