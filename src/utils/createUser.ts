import { users } from "../models/Users";
import { professionals } from "../models/Professionals";
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
  };
  const category = user?.category;

  users.push(newUser);
  if (typeof category !== "undefined")
    professionals.push({ id: newUser.id, category });

  return { ...newUser, category };
}
