import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class SetMarkDto {
    @ApiProperty({ type: 'string', example: '1' })
    @Type(() => Number)
    @IsNumber()
    id: number;

    @ApiProperty({ required: false, type: 'string', example: '1' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    mark_id: number;

    @ApiProperty({ type: 'string', example: 'Hello world!' })
    @IsString()
    content: string;

    @ApiProperty({ type: 'string', example: '0' })
    @Type(() => Number)
    @IsNumber()
    index: number;

    @ApiProperty({ type: 'string', example: '2' })
    @Type(() => Number)
    @IsNumber()
    count: number;

    @ApiProperty({ required: false, type: 'string', example: '1' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    type: number;
}
