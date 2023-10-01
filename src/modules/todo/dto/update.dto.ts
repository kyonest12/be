import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto {
    @ApiProperty({ example: 'string', required: false })
    @IsOptional()
    @IsString()
    title: string;

    @ApiProperty({ example: 'string', required: false })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    done: boolean;

    @ApiProperty({ example: false, required: false })
    @IsOptional()
    @IsBoolean()
    is_public: boolean;
}
