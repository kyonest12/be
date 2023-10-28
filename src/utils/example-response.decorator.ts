import { ApiResponse } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const ExampleSuccessResponse = (data: any) => {
    return ApiResponse({
        status: 200,
        content: {
            json: {
                example: {
                    code: 1000,
                    message: 'OK',
                    data,
                },
            },
        },
    });
};

export const ExampleResponse = (status: number, data: any) => {
    return ApiResponse({
        status,
        content: {
            json: {
                example: data,
            },
        },
    });
};

export const SchemaResponse = (status: number, data: SchemaObject) => {
    return ApiResponse({
        status,
        schema: {
            type: 'object',
            properties: {
                code: { type: 'number', example: 1000 },
                message: { type: 'string', example: 'OK' },
                data,
            },
        },
    });
};
