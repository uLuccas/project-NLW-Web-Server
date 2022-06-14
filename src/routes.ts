import express from "express";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3f1480b06b7e8d",
    pass: "aea49a4c545181",
  },
});

routes.post("/feedback", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });
  await transport.sendMail({
    from: "Equipe do Luccas <no-reply@equipefeedback.com>",
    to: "Luccas <luccas.sanches@nextpage.com.br>",
    subject: "New Feedback",
    html: [
      `<div style="font-family: sans-serif; font-size:16px; color: #111"`,
      `<p>Tipo de feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`,
    ].join("\n"),
  });
  res.status(201).json({ data: feedback });
});
