import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetUserInfoDto {
    @ApiProperty({ required: false, type: 'string', example: '0' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    user_id: number;
}
