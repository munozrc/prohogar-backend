export type UserModel = {
  id?: string;
  name: string | undefined;
  email: string;
  password: string;
  photo: string | undefined;
  role: string | undefined;
  category?: string | undefined;
};

export interface ISafeData {
  user?: object;
  jwt?: string;
}
