import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetListBlocks {
    @ApiProperty({ type: 'string', required: true, example: '0' })
    @Type(() => Number)
    @IsNumber()
    index: number;

    @ApiProperty({ type: 'string', required: true, example: '5' })
    @Type(() => Number)
    @IsNumber()
    count: number;
}
