import { Email, EmailProps } from "../entities/email";

export interface IEmailRepository {
  createEmail(emailProps: EmailProps): Promise<Email>;
}
