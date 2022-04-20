export interface ErrorResponse {
  error: {
    errors: Array<{
      message: string;
    }>;
    message?: string;
  };
}
