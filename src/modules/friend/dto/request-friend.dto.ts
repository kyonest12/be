import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class SetRequestFriendDto {
    @Type(() => Number)
    @IsNumber()
    user_id: number;
}
