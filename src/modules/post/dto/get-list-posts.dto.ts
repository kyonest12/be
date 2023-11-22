import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Allow, IsInt, IsOptional } from 'class-validator';

export class GetListPostsDto {
    @ApiProperty({ required: false, type: 'string', example: '1' })
    @Allow()
    user_id: number;

    @ApiProperty({ required: false, type: 'string', example: '1' })
    @Allow()
    in_campaign: number;

    @ApiProperty({ required: false, type: 'string', example: '1' })
    @Allow()
    campaign_id: number;

    @ApiProperty({ required: false, type: 'string', example: '1.0' })
    @Allow()
    latitude: number;

    @ApiProperty({ required: false, type: 'string', example: '1.0' })
    @Allow()
    longitude: number;

    @ApiProperty({ required: false, type: 'string', example: '6' })
    @Type(() => Number)
    @IsInt()
    last_id: number;

    @ApiProperty({ type: 'string', example: '0' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    index: number;

    @ApiProperty({ type: 'string', example: '10' })
    @Type(() => Number)
    @IsInt()
    count: number;
}
