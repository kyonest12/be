import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SetDevtokenDto {
    @ApiProperty({
        example: '1234567890',
    })
    @IsNotEmpty()
    @IsString()
    token: string;

    @ApiProperty({
        example: '1',
    })
    @IsNotEmpty()
    @IsString()
    devtype: string;

    @ApiProperty({
        example: 'deviceToken123',
    })
    @IsNotEmpty()
    @IsString()
    devtoken: string;
}
