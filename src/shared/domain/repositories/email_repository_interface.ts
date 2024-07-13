import { Email } from "../entities/email";

export interface IEmailRepositoryInterface {
  create_email(email: string, team: string, role: string): Promise<Email>;
}
