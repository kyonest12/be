import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Allow, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SearchDto {
    @ApiProperty({ example: 'hello' })
    @IsString()
    @IsNotEmpty()
    keyword: string;

    @ApiProperty({ type: 'string', example: '1' })
    @Allow()
    user_id: any;

    @ApiProperty({ type: 'string', example: '0' })
    @Type(() => Number)
    @IsInt()
    index: number;

    @ApiProperty({ type: 'string', example: '10' })
    @Type(() => Number)
    @IsInt()
    count: number;
}
