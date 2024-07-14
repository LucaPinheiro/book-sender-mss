import { sendEmails } from "../../../shared/infra/repositories/email_repository_nodemailer";
export class SendEmailUsecase {
  async execute(
    recipients: string[],
    subject: string,
    text: string,
    pdfPath: string
  ): Promise<boolean> {
    try {
      await sendEmails(recipients, subject, text, pdfPath);
      return true;
    } catch (error) {
      console.error("Failed to send email:", error);
      return false;
    }
  }
}
