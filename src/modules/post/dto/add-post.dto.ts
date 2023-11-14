import { FileValidator, ParseFilePipe } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { FilesArrayMaxSizeValidator, FilesArrayTypeValidator } from '../../../utils/image-validation.util';
import { Allow, IsOptional, IsString } from 'class-validator';

export class AddPostDto {
    @ApiProperty({ required: false, type: 'array', items: { type: 'file' } })
    @Allow()
    image: any;

    @ApiProperty({ required: false, type: 'file' })
    @Allow()
    video: any;

    @ApiProperty({ required: false, type: 'string', example: 'Hello world!' })
    @IsOptional()
    @IsString()
    described?: string;

    @ApiProperty({ required: false, type: 'string', example: 'Hyped' })
    @IsOptional()
    @IsString()
    status?: string;

    @ApiProperty({ required: false, type: 'string', example: '1' })
    @Allow()
    auto_accept?: any;
}

class AddPostFilesValidator extends FileValidator {
    videoValidator = {
        maxSize: new FilesArrayMaxSizeValidator({ maxSize: 671088640 }),
        fileType: new FilesArrayTypeValidator({ fileType: /mp4/ }),
    };
    imageValidator = {
        maxSize: new FilesArrayMaxSizeValidator({ maxSize: 209715200 }),
        fileType: new FilesArrayTypeValidator({ fileType: /jpeg|png|jpg|svg/ }),
    };
    message = 'unknown error';

    async isValid(body: any) {
        if (body.video) {
            if (!this.videoValidator.fileType.isValid(body.video)) {
                this.message = 'video: ' + this.videoValidator.fileType.buildErrorMessage();
                return false;
            }
            if (!this.videoValidator.maxSize.isValid(body.video)) {
                this.message = 'video: ' + this.videoValidator.maxSize.buildErrorMessage();
                return false;
            }
        }
        if (body.images) {
            if (!this.imageValidator.fileType.isValid(body.images)) {
                this.message = 'images: ' + this.imageValidator.fileType.buildErrorMessage();
                return false;
            }
            if (!this.imageValidator.maxSize.isValid(body.images)) {
                this.message = 'images: ' + this.imageValidator.maxSize.buildErrorMessage();
            }
        }
        return true;
    }

    buildErrorMessage() {
        return this.message;
    }
}

export const addPostFilesValidator = new ParseFilePipe({
    validators: [new AddPostFilesValidator({})],
    fileIsRequired: false,
});
