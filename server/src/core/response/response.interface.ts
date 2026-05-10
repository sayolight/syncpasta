interface BaseResponse {
  success: boolean;
  timestamp: string;
}

interface SuccessResponse<T> extends BaseResponse {
  success: true;
  data: T;
}

interface ErrorResponse extends BaseResponse {
  success: false;
  error: Error;
}

export interface Error {
  code: string;
  message: string;
  details?: any[];
}

export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;
