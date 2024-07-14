import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendEmails(recipients: string[], subject: string, text: string, pdfPath: string) {
  const pdfContent = fs.readFileSync(path.resolve(__dirname, pdfPath));

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
    } catch (error) {
      console.error(`Erro ao enviar e-mail para ${to}: ${error}`);
    }
  }
}

// const recipients = ['lucapgomes11@gmail.com', 'lucapinheirog@gmail.com'];
// const pdfPath = '../../../../cv_LucaGomes.pdf';
// sendEmails(recipients, 'Teste', 'Olá, tudo bem?', pdfPath);
