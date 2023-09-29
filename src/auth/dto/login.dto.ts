import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    device_id: string;
}
