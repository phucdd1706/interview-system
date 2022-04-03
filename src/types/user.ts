import { UserProfile } from 'types/user-profile';

export interface UserStateProps {
  users: UserProfile[];
  error: object | string | null;
}
