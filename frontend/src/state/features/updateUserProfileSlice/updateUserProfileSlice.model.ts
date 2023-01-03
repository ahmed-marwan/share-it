export interface UpdateUserProfileState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    updatedProfile: UpdateUserProfile | undefined;
    error: string | undefined;
  }
  
  export interface UpdateUserProfile {
    _id: string;
    name: string;
    email: string;
  }