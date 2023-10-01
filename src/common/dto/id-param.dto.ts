import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class IdParam {
    @ApiProperty({ example: 1 })
    @Type(() => Number)
    @IsNumber()
    id: number;
}
