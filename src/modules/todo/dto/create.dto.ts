import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
    @ApiProperty({ example: 'string' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'string', required: false })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ example: false, required: false })
    @IsOptional()
    @IsBoolean()
    is_public: boolean;
}
