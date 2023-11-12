import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common';
import { Allow, IsOptional, IsString } from 'class-validator';
import { AppException } from '../../../exceptions/app.exception';

export class SetUserInfoDto {
    @IsOptional()
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    description: string;

    @Allow()
    avatar: any;

    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsString()
    city: string;

    @IsOptional()
    @IsString()
    country: string;

    @Allow()
    cover_image: any;

    @IsOptional()
    @IsString()
    link: string;
}

export const imageValidation = new ParseFilePipe({
    validators: [
        new MaxFileSizeValidator({ maxSize: 209715200 }),
        new FileTypeValidator({ fileType: /jpeg|png|jpg|svg/ }),
    ],
    fileIsRequired: false,
    exceptionFactory(error) {
        return new AppException(1003, 400, error);
    },
});
