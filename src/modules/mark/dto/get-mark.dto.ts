import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetMarkDto {
    @ApiProperty({ type: 'string', example: '1' })
    @Type(() => Number)
    @IsNumber()
    id: number;

    @ApiProperty({ type: 'string', example: '0' })
    @Type(() => Number)
    @IsNumber()
    index: number;

    @ApiProperty({ type: 'string', example: '20' })
    @Type(() => Number)
    @IsNumber()
    count: number;
}
