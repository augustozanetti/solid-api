import { IUserRepository } from "../IUserRepository";
import { User } from "../../entities/User";

const users: User[] = [];

export class PostgresUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User> {
    return users.find(({ email: userEmail }) => userEmail === email);
  }

  async save(user: User): Promise<void> {
    users.push(user);
  }
}
