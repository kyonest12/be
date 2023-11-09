import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class SetAcceptFriend {
    @ApiProperty({ example: 1 })
    @Type(() => Number)
    @IsNumber()
    user_id: number;

    @ApiProperty({
        example: '1',
    })
    @IsString()
    is_accept: string;
}
