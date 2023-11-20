import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ReportPostDto {
    @ApiProperty({ type: 'string', example: '1' })
    @Type(() => Number)
    @IsInt()
    id: number;

    @ApiProperty({ example: 'Subject' })
    @IsString()
    @IsNotEmpty()
    subject: string;

    @ApiProperty({ example: 'Details' })
    @IsString()
    @IsNotEmpty()
    details: string;
}
