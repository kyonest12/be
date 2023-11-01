import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsString, Length, Matches } from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty({ example: 'example@email.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    @Matches(/^\d+/)
    code: string;

    @ApiProperty({ example: 'Abcd1234' })
    @IsString()
    @IsAlphanumeric()
    @Length(6, 10)
    password: string;
}
