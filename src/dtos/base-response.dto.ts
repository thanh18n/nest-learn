export class BaseResponseDto<T = any> {
    status: number;
    message?: string
    data?: T
}