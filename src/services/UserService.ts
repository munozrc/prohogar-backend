import ISafeData from "../typings/ISafeData";
import UserModel from "../models/UserModel";
import jwt from "jsonwebtoken";
import {
  FATAL_SERVER_ERROR,
  INVALID_CREDENTIALS,
  LOGIN_SUCCESSFUL,
  SUCCESSFULLY_REGISTERED,
  USER_ALREADY_EXISTS,
} from "../constants";

interface AuthReturnData {
  message: string;
  success: boolean;
  data?: object;
}

let users = [
  {
    id: "0",
    name: "Carlos",
    lastName: "Muñoz",
    email: "carlos@gmail.com",
    password: "12345",
    profileImage: "",
    role: "client",
    category: 0,
  },
  {
    id: "1",
    name: "David",
    lastName: "Chicunque",
    email: "david@gmail.com",
    password: "12345",
    profileImage: "",
    role: "professional",
    category: 1,
  },
];

class UserService {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly name?: string,
    public readonly lastName?: string,
    public readonly profileImage?: string,
    public readonly role?: string,
    public readonly category?: number
  ) {}

  public async login(): Promise<AuthReturnData> {
    try {
      const userFromDb = users.find((user) => user.email === this.email);
      if (userFromDb) {
        // const isPasswordEqual = (userFromDb.password === this.password);
        if (userFromDb.password === this.password) {
          const data = this.prepareData(userFromDb);
          return {
            message: LOGIN_SUCCESSFUL,
            success: true,
            data: data,
          };
        } else {
          return { message: INVALID_CREDENTIALS, success: false };
        }
      } else {
        return { message: INVALID_CREDENTIALS, success: false };
      }
    } catch (error) {
      console.log(error);
      return { message: FATAL_SERVER_ERROR, success: false };
    }
  }

  public async register(): Promise<AuthReturnData> {
    try {
      const userFromDb = users.find((user) => user.email === this.email);
      if (!userFromDb) {
        // const hashedPassword = await bcrypt.hash(this.password, 10);
        // const createdUser = await db.User.create({
        //     username: this.username,
        //     password: hashedPassword,
        //     bio: this.bio,
        // });

        const newUser = {
          // Temporal Code
          id: "2",
          name: this.name || "",
          lastName: this.lastName || "",
          email: this.email,
          password: this.password,
          profileImage: this.profileImage || "",
          role: this.role || "",
          category: this.category || 0,
        };

        users.push(newUser);

        const data = this.prepareData(newUser);
        return {
          message: SUCCESSFULLY_REGISTERED,
          success: true,
          data: data,
        };
      } else {
        return { message: USER_ALREADY_EXISTS, success: false };
      }
    } catch (e) {
      console.log(e);
      return { message: FATAL_SERVER_ERROR, success: false };
    }
  }

  private prepareData(user: UserModel): ISafeData {
    const token = jwt.sign({ user }, "cambiarClave", { expiresIn: "30d" });
    const data: ISafeData = {
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
        category: user.category,
      },
      jwt: token,
    };
    return data;
  }
}

export default UserService;
