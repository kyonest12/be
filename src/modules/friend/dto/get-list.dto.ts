import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class GetListDto {
    @IsString()
    token: string;

    @Type(() => Number)
    @IsNumber()
    index: number;

    @Type(() => Number)
    @IsNumber()
    count: number;
}
