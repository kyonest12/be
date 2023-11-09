import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetListBlocks {
    @ApiProperty({ required: false, example: '0' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    index: number;

    @ApiProperty({ required: false, example: '5' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    count: number;
}
