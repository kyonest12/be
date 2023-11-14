import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { AddPostDto } from './add-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ParseArray } from '../../../utils/customed-validation.util';

export class EditPostDto extends AddPostDto {
    @ApiProperty({ type: 'string', example: '1' })
    @Type(() => Number)
    @IsInt()
    id: number;

    @ApiProperty({ required: false, type: 'string', example: '1,2' })
    @IsOptional()
    @ParseArray(Number)
    @IsInt({ each: true })
    image_del?: number[];

    @ApiProperty({ required: false, type: 'string', example: '2,1' })
    @IsOptional()
    @ParseArray(Number)
    @IsInt({ each: true })
    image_sort?: number[];
}
