import { MailAdapter } from "./../adapters/mailAdapter";
import { FeedbacksRepository } from "./../repositories/feedbacksRepositories";

interface SubmitFeedbackRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedback {
  constructor(
    private FeedbacksRepository: FeedbacksRepository,
    private MailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackRequest) {
    const { type, comment, screenshot } = request;

    if (!type) throw new Error("Type is required!");
    if (!comment) throw new Error("Comment is required!");

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format.");
    }

    await this.FeedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.MailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
        `<p>Tipo de Feedback: ${type}</p>`,
        `<p>Comentário: ${comment}`,
        `</div>`,
      ].join("\n"),
    });
  }
}
