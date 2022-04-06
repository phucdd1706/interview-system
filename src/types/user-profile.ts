export type HandleFunction = (i: string, s: string) => Promise<void>;

export type UserProfile = {
  id?: string;
  name?: string;
  type?: number;
};
