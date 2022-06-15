import { NodemailerMailAdapter } from "./adapters/nodemailer/nidemailerMailAdapter";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prismaFeedbacksRepository";
import { SubmitFeedback } from "./functions/submitFeedback";
import express from "express";

export const routes = express.Router();

routes.post("/feedback", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const SubmitFeedbackReq = new SubmitFeedback(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await SubmitFeedbackReq.execute({
    type,
    comment,
    screenshot,
  });

  res.status(201).send();
});
