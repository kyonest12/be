import { FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';

export class FilesArrayMaxSizeValidator extends MaxFileSizeValidator {
    isValid(files: any): boolean {
        return files.every((file: any) => super.isValid(file));
    }
}

export class FilesArrayTypeValidator extends FileTypeValidator {
    isValid(files: any): boolean {
        return files.every((file: any) => super.isValid(file));
    }
}

export class FileFieldsMaxSizeValidator extends FilesArrayMaxSizeValidator {
    isValid(files: any): boolean {
        for (const key in files) {
            for (const file of files[key]) {
                if (!super.isValid(file)) return false;
            }
        }
        return true;
    }
}

export class FileFieldsTypeValidator extends FileTypeValidator {
    isValid(files: any): boolean {
        for (const key in files) {
            for (const file of files[key]) {
                if (!super.isValid(file)) return false;
            }
        }
        return true;
    }
}
