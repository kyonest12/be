import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { DevTokenType } from 'src/constants/dev-token-type.enum';

export class SetDevtokenDto {
    @ApiProperty({
        type: 'string',
        example: '1',
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsEnum(DevTokenType)
    devtype: DevTokenType;

    @ApiProperty({
        example: 'deviceToken123',
    })
    @IsNotEmpty()
    @IsString()
    devtoken: string;
}
