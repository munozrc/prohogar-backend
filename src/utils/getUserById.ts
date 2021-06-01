import { users } from "../models/Users";

export default function getUserById(id: string) {
  const userFind = users.find((user) => user.id === id);
  if (userFind) {
    return {
      name: userFind.name,
      photo: userFind.photo,
      email: userFind.email,
    };
  }
  return null;
}
