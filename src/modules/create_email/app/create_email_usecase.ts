import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { IEmailRepository } from "../../../shared/domain/repositories/email_repository_interface";
import { Email, EmailProps } from "../../../shared/domain/entities/email";
import { InvalidParameter } from "../../../shared/helpers/errors/controller_errors";

export class CreateEmailUsecase {
  constructor(private repo: IEmailRepository) {}

  async execute(emailProps: EmailProps) {
    if (!emailProps.email) {
      throw new EntityError("name");
    }

    if (!emailProps.role) {
      throw new EntityError("role");
    }

    if (!Email.isValidRole(emailProps.role)) {
      throw new InvalidParameter("role", "Invalid role");
    }

    if (!Email.isValidEmail(emailProps.email)) {
      throw new InvalidParameter("email", "Invalid email format");
    }

    if (!Email.isValidTeam(emailProps.team)) {
      throw new InvalidParameter("team", "Invalid team");
    }

    if (!emailProps.team) {
      throw new EntityError("team");
    }

    const newEmail = await this.repo.createEmail(emailProps);
    return newEmail;
  }
}
