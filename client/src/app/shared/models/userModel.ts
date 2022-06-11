export interface UserModel {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  token?: string;
}
