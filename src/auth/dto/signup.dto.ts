import { ApiProperty } from '@nestjs/swagger';
import { LoginDto } from './login.dto';
import { IsAlphanumeric, IsString, Length } from 'class-validator';

export class SignupDto extends LoginDto {
    @ApiProperty({ example: 'Abcd1234' })
    @IsString()
    @IsAlphanumeric()
    @Length(6, 10)
    password: string;
}
