import { send } from "process";
import { IEmailRepository } from "../../../shared/domain/repositories/email_repository_interface";
import { sendEmails } from "../../../shared/infra/repositories/email_repository_nodemailer";
import { FailToSendEmail } from "../../../shared/helpers/errors/usecase_errors";
export class SendEmailUsecase {
  constructor(private emailRepository: IEmailRepository) {}
  async execute(
    team: string,
    subject: string,
    text: string,
    pdfPath: string
  ): Promise<boolean> {
    const emailsBoss = await this.emailRepository.getAllEmailsExceptTimeRole();
    const emails = await this.emailRepository.getAllEmailsByTeam(team);
    emailsBoss.push(...emails);
    try {
      console.log("emails: ", emailsBoss);
      const emailList = emails.map((email) => email.email);
      await sendEmails(emailList, subject, text, pdfPath);
      return true;
    } catch (error) {
      if (error instanceof FailToSendEmail) {
        console.error("Failed to send email:", error);
        return false;
      }
      console.error("Failed to send email:", error);
      return false;
    }
  }
}
