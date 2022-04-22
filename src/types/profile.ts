export interface ProfileStateProps {
  profiles: Profile[];
  error: object | string | null;
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
