export interface UserData {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: UserData;
}

export interface RegisterResponse {
  message: string;
  token?: string;
  user?: UserData;
}

export interface LogoutResponse {
  message: string;
}
