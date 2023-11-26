import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { ParseBoolean } from '../../../utils/custom-validation.util';

export class SetPushSettingsDto {
    @ApiProperty({ type: 'string', example: '1' })
    @ParseBoolean()
    @IsBoolean()
    like_comment: boolean;

    @ApiProperty({ type: 'string', example: '1' })
    @ParseBoolean()
    @IsBoolean()
    from_friends: boolean;

    @ApiProperty({ type: 'string', example: '1' })
    @ParseBoolean()
    @IsBoolean()
    requested_friend: boolean;

    @ApiProperty({ type: 'string', example: '1' })
    @ParseBoolean()
    @IsBoolean()
    suggested_friend: boolean;

    @ApiProperty({ type: 'string', example: '1' })
    @ParseBoolean()
    @IsBoolean()
    birthday: boolean;

    @ApiProperty({ type: 'string', example: '1' })
    @ParseBoolean()
    @IsBoolean()
    video: boolean;

    @ApiProperty({ type: 'string', example: '1' })
    @ParseBoolean()
    @IsBoolean()
    report: boolean;

    @ApiProperty({ type: 'string', example: '1' })
    @ParseBoolean()
    @IsBoolean()
    sound_on: boolean;

    @ApiProperty({ type: 'string', example: '1' })
    @ParseBoolean()
    @IsBoolean()
    notification_on: boolean;

    @ApiProperty({ type: 'string', example: '1' })
    @ParseBoolean()
    @IsBoolean()
    vibrant_on: boolean;

    @ApiProperty({ type: 'string', example: '1' })
    @ParseBoolean()
    @IsBoolean()
    led_on: boolean;
}
