import { IEmailRepository } from "../../../shared/domain/repositories/email_repository_interface";
import { UnprocessableEntity } from "../../../shared/helpers/http/http_codes";

export class DeleteEmailUsecase {
  constructor(private emailRepository: IEmailRepository) {}

  async execute(email: string): Promise<any> {
    if (!email) {
      throw new UnprocessableEntity("Email ID is required");
    }
    await this.emailRepository.deleteEmail(email);
  }
}
