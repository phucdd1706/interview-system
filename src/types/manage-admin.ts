export type QLAdmin = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  type: number;
  status: number;
};
export type QLAdminResponse = {
  success: {
    data: QLAdmin[];
    total: number;
  };
  message?: string;
};
