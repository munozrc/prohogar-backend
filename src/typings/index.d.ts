declare global {
  namespace Express {
    interface Request {
      verifiedUser: ISafeUser;
    }
  }
}

export type UserModel = {
  id?: string;
  name: string | undefined;
  email: string;
  password: string;
  photo: string | undefined;
  role: string | undefined;
  category?: string | undefined;
};

export type ServiceModel = {
  id: string; // ID client
  state: number;
  title: string;
  category: string;
  location: string;
  description: string;
  date: string;
  professionals: Array<string>;
  professional: string | null;
};

export interface ISafeData {
  user?: object;
  service?: object;
  jwt?: string;
}
