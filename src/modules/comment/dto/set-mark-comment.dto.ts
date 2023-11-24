import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, ValidateIf } from 'class-validator';
import { MarkType } from 'src/constants/mark-type.enum';

export class SetMarkCommentDto {
    @ApiProperty({ type: 'string', example: '1' })
    @ValidateIf((o) => !o.mark_id)
    @Type(() => Number)
    @IsInt()
    id: number;

    @ApiProperty({ type: 'string', example: 'so good' })
    @Optional()
    @IsString()
    content: string;

    @ApiProperty({ type: 'string', example: '0' })
    @Type(() => Number)
    @IsInt()
    index: number;

    @ApiProperty({ type: 'string', example: '10' })
    @Type(() => Number)
    @IsInt()
    count: number;

    @ApiProperty({ type: 'string', example: '1' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    mark_id: number;

    @ApiProperty({ type: 'string', example: '1' })
    @IsOptional()
    @ValidateIf((o) => !o.mark_id)
    @Type(() => Number)
    @IsEnum(MarkType)
    type: MarkType;
}
