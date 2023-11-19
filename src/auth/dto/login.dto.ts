import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'example@email.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Abcd1234' })
    @IsString()
    password: string;

    @ApiProperty({ example: 'string' })
    @IsString()
    @IsNotEmpty()
    uuid: string;
}
