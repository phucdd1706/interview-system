export type HandleFunction = (i: string, s: string) => Promise<void>;

export type UserProfile = {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  dob?: string;
  phone?: string;
  gender?: string;
  type?: number;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
};
