export interface LogoutState {
  status: 'idle' | 'succeeded' | 'failed';
  error: string | undefined;
}