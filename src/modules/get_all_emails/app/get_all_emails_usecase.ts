import { Email } from "../../../shared/domain/entities/email";
import { IEmailRepository } from "../../../shared/domain/repositories/email_repository_interface";

export class GetAllEmailsUsecase {
  constructor(private repo: IEmailRepository) {}

  async execute(): Promise<Email[]> {
    return this.repo.getAllEmails();
  }
}
