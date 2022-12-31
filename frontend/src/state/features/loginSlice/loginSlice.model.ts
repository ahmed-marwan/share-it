export interface LoginState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  user: IUser | undefined;
  error: string | undefined;
}

export interface IUser {
  _id: string;
  name: string;
}
