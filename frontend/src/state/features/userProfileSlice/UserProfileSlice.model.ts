export interface UserProfileState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  profile: UserProfile | undefined;
  error: string | undefined;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
}