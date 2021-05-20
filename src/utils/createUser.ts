import { users } from "../models/Users";
import { uuid } from "uuidv4";
import { UserModel } from "../typings";

export default function createUser(user: UserModel): UserModel {
  const newUser = {
    id: uuid(),
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
