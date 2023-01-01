export interface RegisterState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  user: IUser | undefined;
  error: string | undefined;
}

export interface IUser {
  _id: string;
  name: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}