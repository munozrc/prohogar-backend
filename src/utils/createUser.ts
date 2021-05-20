import { users } from "../models/Users";
import { v4 as uuidv4 } from "uuid";
import { UserModel } from "../typings";

export default function createUser(user: UserModel): UserModel {
  const newUser = {
    id: uuidv4(),
    name: user.name || "",
    email: user.email,
    password: user.password,
    photo: user.photo || "",
    role: user.role || "",
    category: user?.category,
  };

  users.push(newUser);

  return newUser;
}
