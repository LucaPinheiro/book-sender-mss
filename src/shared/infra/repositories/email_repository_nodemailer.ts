import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendEmails(recipients: string[], subject: string, text: string) {
  for (const to of recipients) {
    const mailOptions = {
      from: process.env.EMAIL_LOGIN,
      to,
      subject,
      text,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`E-mail enviado para ${to}: ${info.response}`);
    } catch (error) {
      console.error(`Erro ao enviar e-mail para ${to}: ${error}`);
    }
  }
}

const recipients = ['lucapgomes11@gmail.com', 'lucapinheirog@gmail.com'];
sendEmails(recipients, 'Teste', 'Olá, tudo bem?');
