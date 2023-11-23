import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt } from 'class-validator';
import { FeelType } from '../../../constants/feel-type.enum';

export class FeelDto {
    @ApiProperty({ type: 'string', example: '1' })
    @Type(() => Number)
    @IsInt()
    id: number;

    @ApiProperty({ type: 'string', example: '0' })
    @Type(() => Number)
    @IsEnum(FeelType)
    type: FeelType;
}
