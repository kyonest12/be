import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsString, Length } from 'class-validator';

export class ChangePasswordDto {
    @ApiProperty({ example: 'Abcd1234' })
    @IsString()
    password: string;

    @ApiProperty({ example: 'Abcd12345' })
    @IsString()
    @IsAlphanumeric()
    @Length(6, 10)
    new_password: string;
}
