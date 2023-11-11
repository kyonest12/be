import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { DevTokenType } from 'src/constants/dev-token-type.enum';

export class SetDevtokenDto {
    @ApiProperty({
        example: '1',
    })
    @IsNotEmpty()
    @IsString()
    devtype: DevTokenType;

    @ApiProperty({
        example: 'deviceToken123',
    })
    @IsNotEmpty()
    @IsString()
    devtoken: string;
}
