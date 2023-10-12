import { IsString, Allow } from 'class-validator';

export class ChangeProfileAfterSignupDto {
    @IsString()
    username: string;

    @Allow()
    avatar: any;
}