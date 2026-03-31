export interface UserData {
  id: number;
  name: string;
  email: string;
}

export interface LoginTokenPayload {
  token: string;
  user: UserData;
}

export interface LoginResponse {
  message: string;
  token: LoginTokenPayload;
  user: null;
}

export interface RegisterResponse {
  message: string;
  token?: string;
  user?: UserData;
}

export interface LogoutResponse {
  message: string;
}
