export interface ErrorResponse {
  error: {
    errors: Array<{
      message: string;
    }>;
    message?: string;
  };
}
interface DataError {
  error: {
    errors: string[];
    message: string;
  };
  message: string;
}
