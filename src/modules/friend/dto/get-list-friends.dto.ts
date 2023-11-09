import { Type } from 'class-transformer';
import { GetListDto } from './get-list.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetListFriendsDto extends GetListDto {
    @ApiProperty({
        required: false,
        example: 0,
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    user_id: number;
}
