import { UserProfile } from './user-profile';

export interface ProfileStateProps {
  profiles: Profile[];
  error: object | string | null;
  userProfile?: UserProfile | null | undefined;
}

export type Profile = {
  name?: string;
  phone?: string;
  dob?: string;
  gender?: string;
};

export type ChangePassword = {
  name?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  password?: string;
  password_confirmation?: string;
};

export interface Payload {
  params?: ChangePassword;
  callback?: (response: any) => void;
}
