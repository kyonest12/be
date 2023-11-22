import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, ValidateIf } from 'class-validator';

export class DeleteSavedSearchDto {
    @ApiProperty({ required: false, type: 'string', example: '1' })
    @ValidateIf((o) => !o.all)
    @Type(() => Number)
    @IsInt()
    search_id: number;

    @ApiProperty({ required: false, type: 'string', example: '1' })
    @IsOptional()
    @Type(() => Number)
    @IsIn([0, 1])
    all: string;
}
