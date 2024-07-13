import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { IEmailRepository } from "../../../shared/domain/repositories/email_repository_interface";
import { Email, EmailProps } from "../../../shared/domain/entities/email";

export class CreateEmailUsecase {
  constructor(private repo: IEmailRepository) {}

  async execute(emailProps: EmailProps) {
    if (!emailProps.email) {
      throw new EntityError("name");
    }

    if (!emailProps.role) {
      throw new EntityError("role");
    }

    if (!emailProps.team) {
      throw new EntityError("team");
    }

    const newEmail = await this.repo.createEmail(emailProps);
    return newEmail;
  }
}
