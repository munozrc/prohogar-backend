export default interface UserModel {
  readonly id: string;
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly profileImage: string;
  readonly role: string;
  readonly category: number;
}
