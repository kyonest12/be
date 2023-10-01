import { ApiResponse } from '@nestjs/swagger';

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
