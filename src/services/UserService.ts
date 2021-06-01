import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { ACCESS_TOKEN_SECRET } from "../config";
import { ISafeData, UserModel } from "../typings";
import { users } from "../models/Users";
import { professionals } from "../models/Professionals";

interface AuthReturnData {
  message: string;
  success: boolean;
  data?: object;
}

class UserService {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly name?: string,
    public readonly photo?: string,
    public readonly role?: string,
    public readonly category?: string | undefined
  ) {}

  public async login(): Promise<AuthReturnData> {
    try {
      const userFromDb = users.find((user) => user.email === this.email);
      if (userFromDb) {
        if (userFromDb.password === this.password) {
          const userPro = professionals.find(
            (user) => user.id === userFromDb.id
          );
          const data = this.prepareData({
            ...userFromDb,
            category: userPro?.category,
          });
          return {
            message: "LOGIN_SUCCESSFUL",
            success: true,
            data: data,
          };
        } else {
          return { message: "INVALID_CREDENTIALS", success: false };
        }
      } else {
        return { message: "INVALID_CREDENTIALS", success: false };
      }
    } catch (error) {
      console.log(error);
      return { message: "FATAL_SERVER_ERROR", success: false };
    }
  }

  public async register(): Promise<AuthReturnData> {
    try {
      const userFromDb = users.find((user) => user.email === this.email);
      if (!userFromDb) {
        const newUser = {
          id: uuidv4(),
          name: this.name || "",
          email: this.email,
          password: this.password,
          photo: this.photo || "",
          role: this.role || "",
        };

        if (typeof this.category !== "undefined")
          professionals.push({ id: newUser.id, category: this.category });

        users.push(newUser);

        const data = this.prepareData({ ...newUser, category: this.category });

        return {
          message: "SUCCESSFULLY_REGISTERED",
          success: true,
          data: data,
        };
      } else {
        return { message: "USER_ALREADY_EXISTS", success: false };
      }
    } catch (e) {
      console.log(e);
      return { message: "FATAL_SERVER_ERROR", success: false };
    }
  }

  private prepareData(user: UserModel): ISafeData {
    const token = jwt.sign({ user }, ACCESS_TOKEN_SECRET, { expiresIn: "30d" });
    const data: ISafeData = {
      user: {
        id: user.id,
        name: user.name,
        photo: user.photo,
        role: user.role,
        category: user.category,
      },
      jwt: token,
    };
    return data;
  }
}

export default UserService;
