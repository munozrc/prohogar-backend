declare global {
  namespace Express {
    interface Request {
      verifiedUser: ISafeUser;
    }
  }
}

export type UserModel = {
  id?: string;
  name?: string;
  email: string;
  password: string;
  photo?: string;
  role?: string;
  category?: string;
};

export type ServiceModel = {
  id?: string;
  client: string;
  state?: number;
  title: string;
  category: string;
  location: string;
  description: string;
  date?: string;
  professionals?: Array<string>;
  professional?: string | null;
};

export interface ISafeData {
  user?: object;
  service?: object;
  jwt?: string;
}
