import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class SetAcceptFriend {
    @Type(() => Number)
    @IsNumber()
    user_id: number;

    @IsString()
    is_accept: string;
}
