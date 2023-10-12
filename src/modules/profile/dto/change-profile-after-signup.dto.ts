import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common';
import { Allow, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppException } from '../../../exceptions/app.exception';

export class ChangeProfileAfterSignupDto {
    @ApiProperty({ example: 'example' })
    @IsString()
    username: string;

    @ApiProperty({ type: 'file', required: false })
    @Allow()
    avatar: any;
}

export const avatarValidation = new ParseFilePipe({
    validators: [
        new MaxFileSizeValidator({ maxSize: 209715200 }),
        new FileTypeValidator({ fileType: /jpeg|png|jpg|svg/ }),
    ],
    exceptionFactory(error) {
        return new AppException(1003, 400, error);
    },
});
