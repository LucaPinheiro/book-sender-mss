import { Email, EmailProps } from "../entities/email";

export interface IEmailRepository {
  createEmail(emailProps: EmailProps): Promise<Email>;
  getAllEmails(): Promise<Email[]>;
  getAllEmailsByTeam(team: string): Promise<Email[]>;
  getAllEmailsByRole(role: string): Promise<Email[]>;
  getAllEmailsExceptTimeRole(): Promise<Email[]>;
  deleteEmail(email: string): Promise<void>;
}
