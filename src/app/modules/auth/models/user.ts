export interface IAuthenticationPayload {
  email: string;
  password: string;
}
export interface IRegistrationPayload {
  email: string;
  password1: string;
  password2: string;
}

export interface IUser {
  first_name: string;
  username: string;
  last_name: string;
  id: string;
}
export interface RESTAuthToken {
  key: string;
}

