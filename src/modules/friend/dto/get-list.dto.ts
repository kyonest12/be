import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetListDto {
    @ApiProperty({ required: false, type: 'string', example: '0' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    index: number;

    @ApiProperty({ required: false, type: 'string', example: '5' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    count: number;
}
