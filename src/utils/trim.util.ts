import { Transform, TransformOptions } from 'class-transformer';

export function Trim(transformOptions?: TransformOptions): PropertyDecorator {
    return Transform(({ value }) => {
        if ('string' !== typeof value) {
            return value;
        }
        return value.trim();
    }, transformOptions);
}
