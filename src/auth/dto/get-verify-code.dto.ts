import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class GetVerifyCodeDto {
    @ApiProperty({ example: 'example@email.com' })
    @IsEmail()
    email: string;
}
