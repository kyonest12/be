import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class SetRequestFriendDto {
    @ApiProperty({
        type: 'number',
        example: '1',
    })
    @Type(() => Number)
    @IsNumber()
    user_id: number;
}
