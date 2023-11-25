import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class BuyCoinsDto {
    @ApiProperty({
        type: 'string',
    })
    @IsString()
    code: string;

    @ApiProperty({
        type: 'string',
        example: '3000',
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    coins: number;
}
