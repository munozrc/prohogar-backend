import ISafeUser from "./ISafeUser";

export default interface ISafeData {
  user?: ISafeUser;
  jwt?: string;
}
