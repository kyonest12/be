import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Allow, IsNumber, IsOptional } from 'class-validator';

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
    @IsNumber()
    last_id: number;

    @ApiProperty({ type: 'string', example: '0' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    index: number;

    @ApiProperty({ type: 'string', example: '10' })
    @Type(() => Number)
    @IsNumber()
    count: number;
}
