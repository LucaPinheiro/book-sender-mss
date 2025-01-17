import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { FailToSendEmail } from '../../helpers/errors/usecase_errors';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendEmails(recipients: string[], subject: string, text: string, pdfPath: string) {
  const pdfContent = fs.readFileSync(path.resolve(pdfPath));

  for (const to of recipients) {
    const mailOptions = {
      from: process.env.EMAIL_LOGIN,
      to,
      subject,
      text,
      attachments: [
        {
          filename: path.basename(pdfPath),
          content: pdfContent,
          contentType: 'application/pdf'
        }
      ]
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`E-mail enviado para ${to}: ${info.response}`);
    } catch (error: any) {
      throw new FailToSendEmail(`Erro ao enviar e-mail para ${to}: ${error}`);
      console.error(`Erro ao enviar e-mail para ${to}: ${error}`);
    }
  }
}
