import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetPostDto {
    @ApiProperty({ type: 'string', example: '1' })
    @Type(() => Number)
    @IsNumber()
    id: number;
}
