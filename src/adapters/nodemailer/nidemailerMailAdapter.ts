import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "./../mailAdapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3f1480b06b7e8d",
    pass: "aea49a4c545181",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe do Luccas <no-reply@equipefeedback.com>",
      to: "Luccas <luccas.sanches@nextpage.com.br>",
      subject,
      html: body,
    });
  }
}
