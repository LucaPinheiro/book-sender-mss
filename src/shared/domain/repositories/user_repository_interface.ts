import { User } from "../entities/user";

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>
  sessionUser(email: string, password: string): Promise<User | undefined>
  getUserById(id: string): Promise<User | undefined>
}
