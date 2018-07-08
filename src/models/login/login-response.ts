export interface LoginResponse {
  result?: {
    user?: {
      email?: string;
    };
    email?: string;
    uid?: string;
  };
  error?: {
    code?: string;
    message?: string;
  };
}
