import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { cloneDeep, isArray, mergeWith } from 'lodash';

export const extendsSchema = (source: SchemaObject, extend?: SchemaObject) => {
    return mergeWith(cloneDeep(source), extend, (a, b) => (isArray(b) ? b : undefined));
};
