import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetListBlocks {
    @ApiProperty({ type: 'string', required: false, example: '0' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    index: number;

    @ApiProperty({ type: 'string', required: false, example: '5' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    count: number;
}
