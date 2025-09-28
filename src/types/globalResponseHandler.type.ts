export interface ResponseMeta {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  version?: string;
  executionTime?: number;
}
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
  requestId?: string;
  meta?: ResponseMeta;
}
