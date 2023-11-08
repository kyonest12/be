import { Type } from 'class-transformer';
import { GetListDto } from './get-list.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class GetListFriendsDto extends GetListDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    user_id: number;
}
