import { Transform, TransformOptions } from 'class-transformer';

export function Trim(transformOptions?: TransformOptions): PropertyDecorator {
    return Transform(({ value }) => {
        if ('string' !== typeof value) {
            return value;
        }
        return value.trim();
    }, transformOptions);
}

// eslint-disable-next-line
export function ParseArray(transformFn: Function = Number, transformOptions?: TransformOptions): PropertyDecorator {
    return Transform(({ value = '' }) => {
        if ('string' !== typeof value) {
            return value;
        }
        return value.split(',').map((e) => transformFn(e));
    }, transformOptions);
}
