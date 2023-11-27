import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignupDto {
    @ApiProperty({ example: 'example@email.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Abcd1234' })
    @IsString()
    @IsAlphanumeric()
    @Length(6, 10)
    password: string;

    @ApiProperty({ example: 'lmao' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: '1907-11-24T08:23:10.555Z' })
    @IsNotEmpty()
    birthday: Date;
}
