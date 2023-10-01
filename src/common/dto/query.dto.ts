import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryDto {
    @ApiProperty({ example: 1, required: false })
    @Type(() => Number)
    @IsNumber()
    page: number;

    @ApiProperty({ example: 10, required: false })
    @Type(() => Number)
    @IsNumber()
    page_size: number;

    @ApiProperty({ example: 'string', required: false })
    @IsOptional()
    @IsString()
    keyword: string;
}
