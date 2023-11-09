import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetListDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    index: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    count: number;
}
