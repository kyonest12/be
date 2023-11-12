import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetListDto {
    @ApiProperty({ required: true, type: 'string', example: '0' })
    @Type(() => Number)
    @IsNumber()
    index: number;

    @ApiProperty({ required: true, type: 'string', example: '5' })
    @Type(() => Number)
    @IsNumber()
    count: number;
}
