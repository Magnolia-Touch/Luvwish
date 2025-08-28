export declare class ResponseService {
    successResponse(message: string, data?: any, pagination?: any): {
        status: boolean;
        message: string;
        data: any;
        pagination: any;
    };
    errorResponse(message: string, statusCode?: number, errors?: any): {
        status: boolean;
        message: string;
        statusCode: number;
        errors: any;
    };
}
