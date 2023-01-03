export interface UpdateUserPasswordState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}