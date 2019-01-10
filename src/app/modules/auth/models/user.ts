export interface IAuthenticationPayload {
  email: string;
  password: string;
}

export interface IUser {
  first_name: string;
  username: string;
  last_name: string;
  id: string;
}
export class RESTAuthToken {
  key: string;
}

